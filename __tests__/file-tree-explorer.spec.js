const fte = require("../file-tree-explorer").explorer();

describe("Testing the listDirectoryFromPath Function",()=> {
    test("Testing on a fake path (windows)", async () => {
        const inputPath = "E:/FakePath";
        const output = {};

        const result = await fte.listDirectoryFromPath(inputPath); 

        expect(result).toEqual(output);
    });

    test("Testing on a fake path (linux)", async () => {
        const inputPath = "/fakepath/somefakeDir";
        const output = {};

        const result = await fte.listDirectoryFromPath(inputPath); 

        expect(result).toEqual(output);
    });

    test("testing on real path with sub-directories 1", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)";
        const expectedOutput = {
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
        };

        const result = await fte.listDirectoryFromPath(inputPath);
        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path with sub-directories 2", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop";

        const expectedOutput = {
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
            }
        };

        const result = await fte.listDirectoryFromPath(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path with sub-directories 3", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala";

        const expectedOutput = {
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
        };

        const result = await fte.listDirectoryFromPath(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path with sub-directories and with the optional serverRoot parameter set - 1", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop";
        const inputServerRoot = "F:/Study/";
        
        const expectedOutput = {
            Hadoop: {
              files: [
                {
                  name: 'Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf'
                },
                {
                  name: 'Hadoop- The Definitive Guide, 4th Edition.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf'
                },
                {
                  name: 'Mastering Hadoop.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf'
                }
              ]
            }
        };

        let result = await fte.listDirectoryFromPath(inputPath,inputServerRoot);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path with sub-directories and with the optional serverRoot parameter set - 2", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala";
        const inputServerRoot = "F:/Study/";
        
        const expectedOutput = {
            Scala: {
              files: [
                {
                  name: 'Functional Programming in Scala.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf'
                },
                {
                  name: 'Programming Scala.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf'
                },
                {
                  name: 'Scala Cookbook.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf'
                },
                {
                  name: 'Scala for Machine Learning.pdf',
                  isDirectory: false,
                  path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf',
                  relativePath: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf'
                }
              ]
            }
        };

        let result = await fte.listDirectoryFromPath(inputPath,inputServerRoot);

        expect(result).toEqual(expectedOutput);
    });
});

describe("Testing the scanDir Function",() => {
    test("testing on a fake path (windows)", async () => {
        const inputPath = "E:/FakePath";
        const expectedOutput = [];

        const result = await fte.scanDir(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on a fake path (linux)", async () => {
        const inputPath = "/fakepath/someFakeDir";
        const expectedOutput = [];

        const result = await fte.scanDir(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path - 1", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)";
        const expectedOutput = [
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
        ];

        const result = await fte.scanDir(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path - 2", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop";
        const expectedOutput = [
            {
              name: 'Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf'
            },
            {
              name: 'Hadoop- The Definitive Guide, 4th Edition.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf'
            },
            {
              name: 'Mastering Hadoop.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf'
            }
        ];

        const result = await fte.scanDir(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path - 3", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala";
        const expectedOutput = [
            {
              name: 'Functional Programming in Scala.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf'
            },
            {
              name: 'Programming Scala.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf'
            },
            {
              name: 'Scala Cookbook.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf'
            },
            {
              name: 'Scala for Machine Learning.pdf',
              isDirectory: false,
              path: 'F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf'
            }
        ];

        const result = await fte.scanDir(inputPath);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path and the optional serverRoot param set - 1", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Scala";
        const inputServerRoot = "F:/Study/";
        const expectedOutput = [
            {
              name: 'Functional Programming in Scala.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Functional Programming in Scala.pdf'
            },
            {
              name: 'Programming Scala.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Programming Scala.pdf'
            },
            {
              name: 'Scala Cookbook.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Scala Cookbook.pdf'
            },
            {
              name: 'Scala for Machine Learning.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Scala/Scala for Machine Learning.pdf'
            }
        ];

        const result = await fte.scanDir(inputPath,inputServerRoot);

        expect(result).toEqual(expectedOutput);
    });

    test("testing on real path and the optional serverRoot param set - 2", async () => {
        const inputPath = "F:/Study/Big Data (Hadoop, Scala, RHadoop)/Hadoop";
        const inputServerRoot = "F:/Study/";
        const expectedOutput = [
            {
              name: 'Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop MapReduce v2 Cookbook, 2nd Edition.pdf'
            },
            {
              name: 'Hadoop- The Definitive Guide, 4th Edition.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Hadoop- The Definitive Guide, 4th Edition.pdf'
            },
            {
              name: 'Mastering Hadoop.pdf',
              isDirectory: false,
              path: 'Big Data (Hadoop, Scala, RHadoop)/Hadoop/Mastering Hadoop.pdf'
            }
        ];

        const result = await fte.scanDir(inputPath,inputServerRoot);

        expect(result).toEqual(expectedOutput);
    });

});