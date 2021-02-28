const fs = require('fs').promises;
const fsConstants = require('fs').constants;
const platform = require('platform');
const wdl = require('windows-drive-letters');
const util = require("util");

class FileTreeExplorer {
    constructor() {
        this.initSystemRoot();
        if(arguments.length == 1)
            this.path = arguments[0];
        else
            this.path = this.systemRoot;
    }

    initSystemRoot() {
        this.isPlatformWindows = isPlatformWindows();
        if(this.isPlatformWindows)
            this.systemRoot = getWindowsDriveLetters().map((val) => val + ':');
        else
            this.systemRoot = ['/'];
    }

    /**
     * Returns a JavaScript object representing the file structure for the entire file system. For linux it starts at the root directory (/). For windows it traverses each of the Drives one by one using Breadth First Search.
     * 
     * In this object each directory becomes a key, and the all the files are appended to an array at a key named files.
     * All the directories are keys to the object which themselves point to nested objects representing subdirectories.
     * 
     * Check the docs on github for sample return values
     * 
     * @param {String} path The path of the directory which you want to read the contents of 
     * @param {String} serverRoot (Optional) The path from which the server can server static files. This is used to create a relative path that can be appended to the URL for accessing the files
     */
    async listDirectoryFromRoot() {


        let visited  = {};
        let structure = {};
        let root = this.systemRoot.map((val, ind) => ({name : val , isDirectory : true, path : val}))

        let stack = [];
        let fileTree = {};
        stack.push(...root);

        while(!stack.length == 0) {
            let current = stack.shift();

            const baseFolderName = current.path.split("/")[0];

            let pathKeys = current.path.split("/");
            let baseFolderInd = pathKeys.indexOf(baseFolderName);
            pathKeys = pathKeys.slice(baseFolderInd);

            let prev = fileTree;
            let curr;

            for(let pathPart of pathKeys) {
                if(prev[pathPart])
                    curr = prev[pathPart];
                else {
                    prev[pathPart] = {}
                    curr = prev[pathPart];
                }
                prev = curr;
            }

            curr.files = [];

            visited[current.path] = true;
            let contentsInCurrentDir;
            try {
                contentsInCurrentDir = await readDir(current.path+"/");
            } catch(e) {
                console.error(e);
            }
            contentsInCurrentDir = contentsInCurrentDir.map((val) => ({name : val.name, isDirectory : val.isDirectory,  path : current.path+"/"+val.name}));

            for (item of contentsInCurrentDir) {
                if(!(item.path in visited)) {
                    if(item.isDirectory)
                        stack.push(item);
                    if(!item.isDirectory) {
                            curr.files.push(item);
                    }
                }
            }
        }
        return fileTree;
    }

    /**
     * Returns a JavaScript object representing the file structure inside the given path.
     * In this object each directory becomes a key, and the all the files are appended to an array at a key named files.
     * All the directories are keys to the object which themselves point to nested objects representing subdirectories.
     * 
     * Check the docs on github for sample return values
     * 
     * @param {String} path The path of the directory which you want to read the contents of 
     * @param {String} serverRoot (Optional) The path from which the server can server static files. This is used to create a relative path that can be appended to the URL for accessing the files
     */
    async listDirectoryFromPath(path, serverRoot = null) {

        if(!(await isPathADirectory(path))) {
            console.error("The Path provided is either invalid or not a directory, and cannot be traversed upon");
            return {};
        }

        let rootDir = null;
        if(serverRoot) {
            if(serverRoot[serverRoot.length-1] != "/") {
                    rootDir = serverRoot + "/";
            }
            else {
                rootDir = serverRoot;
            }
        }

        let visited  = {};
        let structure = {};
        let nameParts = path.split("/"); 
        const name = nameParts[nameParts.length - 1];
        let root = {name : name, isDirectory: true, path : path, relativePath: rootDir ? path.slice(path.indexOf(rootDir) + rootDir.length)+`/${name}` : path + `/${name}`}

        let stack = [];
        stack.push(root);

        let fileTree = {}

        while(!stack.length == 0) {
            let current = stack.shift();

            let pathKeys = current.path.split("/");
            let baseFolderInd = pathKeys.indexOf(root.name);
            pathKeys = pathKeys.slice(baseFolderInd);


            let prev = fileTree;
            let curr;

            for(let pathPart of pathKeys) {
                if(prev[pathPart])
                    curr = prev[pathPart];
                else {
                    prev[pathPart] = {}
                    curr = prev[pathPart];
                }
                prev = curr;
            }

            curr.files = [];

            visited[current.path] = true;
            let contentsInCurrentDir;
            try {
                contentsInCurrentDir = await readDir(current.path+"/");
            } catch(e) {
                console.error(e);
            }
            contentsInCurrentDir = contentsInCurrentDir.map((val) => ({name : val.name  ,isDirectory : val.isDirectory, path : current.path+"/"+val.name, relativePath: rootDir ? current.path.slice(current.path.indexOf(rootDir) + rootDir.length)+`/${val.name}` : current.path + `/${val.name}`}));

            for (item of contentsInCurrentDir) {
                if(!(item.path in visited)) {
                    if(item.isDirectory)
                        stack.push(item);
                    if(!item.isDirectory) {
                            curr.files.push(item);
                    }
                }
            }
        }
        return fileTree;
    }

    /**
     * an object representing a file/directory
     * @typedef {Object} fileObject
     * @property {String} name - Name of the file/directory
     * @property {boolean} isDirectory - a flag that is true when an objetc is a directory, false otherwise
     * @property {String} path path to the resource on the server 
     *
     */

    /**
     *  Returns an array of file objects that describe the contents in the path. A content object has three properties:
     *  name : name of the items,
     *  isDirectory : a boolean value that represents whether the item is a directory,
     *  path: relative path from your server root,
     * 
     * @param {String} path The path of the directory which you want to read the contents of 
     * @param {String} serverRoot (Optional) The path from which the server can server static files. This is used to create a relative path that can be appended to the URL for accessing the files
     * 
     */
    async scanDir(path, serverRoot = null) {
                
        if(!(await isPathADirectory(path))) {
            console.error("The Path provided is either invalid or not a directory, and cannot be traversed upon");
            return [];
        }

        let root = null;
        if(serverRoot) {
            if(serverRoot[serverRoot.length-1] != "/") {
                    root = serverRoot + "/";
            }
            else {
                root = serverRoot;
            }
        }
        const contentsInDir = await readDir(path);
        const detailedContents = contentsInDir.map(item => ({name : item.name, isDirectory : item.isDirectory, path : root ? path.slice(path.indexOf(root) + root.length)+`/${item.name}` : path + `/${item.name}`}));
        return detailedContents;
    }

    /**
     * Using Depth First Search prints the file tree/ file structure inside a given for the entire file system. For linux it starts at the root directory (/). For windows it traverses each of the Drives one by one.
     * 
     * @param {String} path path from which the file tree is to be traversed and printed
     */
    async printDirectoryFromRoot() {

        let visited  = {};
        let structure = {};
        let root = this.systemRoot.map((val, ind) => ({name : val, path : val, isDirectory : true, level : 0}))
        root.reverse();    
        let stack = [];
        stack.push(...root);

        while(!stack.length == 0) {
            let current = stack.pop();

            const spacer = Array(2* (current.level)).fill(" ").join("") + "|_>";

            console.log(spacer+current.name);
            visited[current.path] = true;
            let contentsInCurrentDir;
            try {
                contentsInCurrentDir = await readDir(current.path+"/");
            } catch(e) {
                console.error(e);
            }
            contentsInCurrentDir = contentsInCurrentDir.map((val) => ({name : val.name, path : current.path+"/"+val.name, isDirectory : val.isDirectory, level: current.level + 1}));

            for (item of contentsInCurrentDir) {
                if(!(item.path in visited)) {
                    if(item.isDirectory)
                        stack.push(item);
                        if(!item.isDirectory) {
                            const spacer = Array(2* item.level).fill(" ").join("") + "|_>";
                            console.log(spacer+item.name)
                        }
                }
            }
        }
    }

    /**
     * Using Depth First Search prints the file tree/ file structure inside a given path
     * 
     * @param {String} path path from which the file tree is to be traversed and printed
     */
    async printDirectoryFromPath(path) {

        if(!(await isPathADirectory(path))) {
            console.error("The Path provided is either invalid or not a directory, and cannot be traversed upon");
        }

        let visited  = {};
        let structure = {};
        let nameParts = path.split("/");
        const name = nameParts[nameParts.length - 1];
        let root = {name : name, path : path, isDirectory: true, level : 0}

        let stack = [];
        stack.push(root);

        while(!stack.length == 0) {
            let current = stack.pop();

            const spacer = Array(2* (current.level)).fill(" ").join("") + "|_>";
            console.log(spacer+current.name);

            visited[current.path] = true;
            let contentsInCurrentDir;
            try {
                contentsInCurrentDir = await readDir(current.path+"/");
            } catch(e) {
                console.error(e);
            }
            contentsInCurrentDir = contentsInCurrentDir.map((val) => ({name : val.name, path : current.path+"/"+val.name, isDirectory : val.isDirectory, level: current.level + 1}));

            for (item of contentsInCurrentDir) {
                if(!(item.path in visited)) {
                    if(item.isDirectory)
                        stack.push(item);
                    if(!item.isDirectory) {
                        const spacer = Array(2* item.level).fill(" ").join("") + "|_>";
                        console.log(spacer+item.name)
                    }
                }
            }
        }
    }

}


async function readDir(path) {
    const future = fs.readdir(path,{withFileTypes : true});
    let contents;
    try {
        contents = await future;
    } catch(err) {
        return [];
    }    
    let fileArr = [];
    for(item of contents) {
        fileArr.push({name : item.name, isDirectory : item.isDirectory()});
    }

    return fileArr;
}

async function pathExists(path) {
    let access = true;
    try {
        await fs.access(path)
    }
    catch(err) {
        console.error(err);
        access = false;
    }
    return access;
}

async function isPathADirectory(path) {
    if(await pathExists(path)) {
        let isDir;

        try {
            const stats = await fs.stat(path);
            isDir = stats.isDirectory();
        } catch(err) {
            console.error(err);
            isDir = false;
        }

        return isDir;
    }
    return false;    
}

function isPlatformWindows() {
    return platform.os.toString().indexOf('Win') > -1;
}

function getWindowsDriveLetters() {
        return wdl.usedSync();
}

function isAccessible(path) {

    fs.access(path,fsConstants.F_OK | fsConstants.R_OK).then(() => console.log("Access")).catch(() => console.log("No Access"))
}

module.exports.explorer = () => new FileTreeExplorer();



