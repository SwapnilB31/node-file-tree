# node-file-tree
node-file-tree is a package for Node.js that converts file/directory structure into JavaScript objects. It also features additional methods that aid in customizing the output. It works on both windows and linux machines.

## Documentation
### How to use

Clone this repository into your project directory, then you can import it in your file using the Node require method as follows:

```javascript
  const fte = require("./node-file-tree/file-tree-explorer").explorer()
```

The **file-tree-explorer.js** file exports one module : **explorer**, which returns a function that exposes all the methods in the package.

### Dependencies
This package has two dependencies:
1. [platform](https://www.npmjs.com/package/platform)
2. [windows-drive-letters](https://www.npmjs.com/package/windows-drive-letters)

Install these dependencies before using this package.

### Properties

1. **isPlatformWindows**: is true when the system is running windows, false otherwise
```javascript
  console.log(fte.isPlatformWindows) //true for windows, false for others
```
2. **systemRoot** : returns an array of Strings that are (a) Drive letters for a windows a machine (b) '/' the root folder for linux
```javascript
  console.log(fte.systemRoot)
  //on windows
  ["C","D","E","F"]
  //on linux
  ["/"]
```

### Methods
* **listDirectoryFromPath(path, serverRoot?)**
  * *@param {String}* **path**: The path of the directory which you want to read the contents of.
  * *@param {String}* **serverRoot**: This parameter is optional. This is the path of the folder from which you can serve static files. When this parameter is passed, a relative path for all dirents with respect to the serverRoot is also returned.
  * *@returns* a promise that resolves into a JS object represents the file/directory structure for the path provided. If the path is invalid, the promise resolves into an empty object 
  
  **Note**: this method doesn't check whether the optional serverRoot param provided by the user forms a valid path. So you must check that on your end before calling the function with serverRoot parameter.
  
  #### Sample Output
  For this directory structure
  ```
    |_>Big Data (Hadoop, Scala, RHadoop)
      |_>DataMining_BOOK.pdf
      |_>Scala
        |_>Functional Programming in Scala.pdf
        |_>Programming Scala.pdf
        |_>Scala Cookbook.pdf
        |_>Scala for Machine Learning.pdf
      |_>Hadoop
        |_>Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf
        |_>Hadoop- The Definitive Guide, 4th Edition.pdf
        |_>Mastering Hadoop.pdf
  ```
  
  The method returns this object
  ```javascript
  {
    'Big Data (Hadoop, Scala, RHadoop)': {
      files: [
        {
          name: 'DataMining_BOOK.pdf',
          isDirectory: false,
          path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/DataMining_BOOK.pdf',       
          relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/DataMining_BOOK.pdf'
        }
      ],
      Hadoop: {
        files: [
          {
            name: 'Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf'
          },
          {
            name: 'Hadoop- The Definitive Guide, 4th Edition.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf'
          },
          {
            name: 'Mastering Hadoop.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf'
          }
        ]
      },
      Scala: {
        files: [
          {
            name: 'Functional Programming in Scala.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf'
          },
          {
            name: 'Programming Scala.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf'
          },
          {
            name: 'Scala Cookbook.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf'
          },
          {
            name: 'Scala for Machine Learning.pdf',
            isDirectory: false,
            path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf',
            relativePath: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf'
          }
        ]
      }
    }
  }
  ```
  
* **listDirectoryFromRoot()**: Async method that returns a promise that resolves into a JS Object similar to the one returned by the **listDirectoryFromPath()** method but represents the directory structure of the entire file system. For windows it does a BFS on all the drive partitions and for linux it does a BFS starting from the root folder (/).

*  **ScanDir(path,serverRoot?)**: 
    * *@param {String}* path: The path of the directory which you want to read the contents of.
    * *@param {String}* serverRoot: This parameter is optional. This is the path of the folder from which you can serve static files. When this parameter is passed, a relative path for all dirents with respect to the serverRoot is also returned.
    *  *@returns* a promise that resolves into an Array of objects that describe the contents of a folder (file/directory). If the path is invalid, it returns an empty array.

    #### Sample Output
    ```javascript
      console.log(await fte.scanDir("F:/Study/Big Data (Hadoop, Scala, RHadoop)"))
      //prints
      [
        {
          name: 'DataMining_BOOK.pdf',
          isDirectory: false,
          path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/DataMining_BOOK.pdf'
        },
        {
          name: 'Hadoop',
          isDirectory: true,
          path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop'
        },
        {
          name: 'Scala',
          isDirectory: true,
          path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala'
        }
      ]
    ```
    
* **printDirectoryFromPath(path)**
    * *@param {String}* path: The path of the directory which you want to read the contents of.
    This method prints the directory structure inside the path provided, to the console.
    
    #### Sample Output
    ```javascript
      fte.printDirectoryFromPath("F:/Study/Big Data (Hadoop, Scala, RHadoop)");
    ```
    prints
    ```
    |_>Big Data (Hadoop, Scala, RHadoop)
      |_>DataMining_BOOK.pdf
      |_>Scala
        |_>Functional Programming in Scala.pdf
        |_>Programming Scala.pdf
        |_>Scala Cookbook.pdf
        |_>Scala for Machine Learning.pdf
      |_>Hadoop
        |_>Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf
        |_>Hadoop- The Definitive Guide, 4th Edition.pdf
        |_>Mastering Hadoop.pdf
    ```
    
* **printDirectoryFromRoot()**: It's similar to **printDirectoryFromPath()** method. The difference is that it performs a Depth First Search on all the Drive partitions on Windows and on the root folder (/) on Linux. Its an asynchronous method and returns a promise; so it needs to be resolved or called inside an async method with the await keyword for it to print the tree-structure. This method may take a lot of time if your system has a deeply nested directory structure.
    
## Issues
Please submit the exact code produced the error along with the error log when you raise an issue. Without the code and the error log, fixing the issues will not be possible. 

## Contribution
All developers are welcome to contribute to, and improve this package. Just create a pull request and I'll evaluate and merge the PR if it doesn't break anything.
