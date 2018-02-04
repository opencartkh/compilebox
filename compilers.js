
/*
	This file stores the compiler/interpretor details that are provided to DockerSandbox.sh	by the app.js
	The index is the key field, 
	First column contains the compiler/interpretor that will be used for translation
	Second column is the file name to use when storing the source code
	Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
	Fourth column is just the language name for display on console, for verbose error messages
	Fifth column is optional, it contains additional arguments/flags for compilers

	You can add more languages to this API by simply adding another row in this file along with installing it in your
	Docker VM.

	Author: Osman Ali 
	Date: 3 - JUN - 2014
	*Revised on: 30th June 2014 (Added Column number 4 to display the name of languages to console)
*/

exports.compilerArray = [
    ["python","file.py","","Python",""],
    ["\'ruby -ractive_support -r active_support/core_ext\'","file.rb","","Ruby",""],
    ["clojure","file.clj","","Clojure",""],
    ["php","file.php","","Php",""],
    ["\'/usr/bin/env node\'","file.js","","Node.js",""],
    ["scala","file.scala","","Scala",""],
    ["\'go run\'","file.go","","Go",""],
    ["\'g++ -std=c++11 -o /usercode/a.out\' ","file.cpp","/usercode/a.out","C/C++",""],
    ["javac","file.java","\'./usercode/javaRunner.sh\'","Java",""],
    ["\'vbnc -nologo -quiet\'","file.vb","\'mono /usercode/file.exe\'","VB.Net",""],
    ["mcs","file.cs","\'mono /usercode/file.exe\'","C#",""],
    ["/bin/bash","file.sh"," ","Bash",""],
    ["gcc ","file.m"," /usercode/a.out","Objective-C","\' -o /usercode/a.out -I/usr/include/GNUstep -L/usr/lib/GNUstep -lobjc -lgnustep-base -Wall -fconstant-string-class=NSConstantString\'"],
    ["/usercode/sql_runner.sh","file.sql","","MYSQL",""],
    ["perl","file.pl","","Perl",""],
    ["\'env HOME=/opt/rust /opt/rust/.cargo/bin/rustc\'","file.rs","/usercode/a.out","Rust","\'-o /usercode/a.out\'"],
    ["/opt/swift/swift-4.0.3-RELEASE-ubuntu16.10/usr/bin/swiftc","file.swift","/usercode/a.out","Swift","\'-o /usercode/a.out\'"],
    ["Rscript","file.r","","R",""],
    ["python3","file.py","","Python3",""],
    ["\'gnat make\'", "main.adb", "/usercode/main", "Ada", ""], // done
    ["a68g", "file.algol", "", "Algol", ""], // done
    ["bf", "file.bf", "", "Brainfuck", ""], // done
    ["\'cobc -x\'", "file.cob", "", "Cobol", ""], // done
    ["coffee", "file.coffee", "", "CoffeeScript", ""], // done
    ["clisp", "file.lisp", "", "Common Lisp", ""], // done
    ["\'gdc -o /usercode/a.out\'", "file.d", "/usercode/a.out", "D", ""], // done
    ["dart", "file.dart", "", "Dart", ""], // done
    ["emacs --script", "file.lisp", "", "Emacslisp", ""], // done
    ["elixir", "file.exs", "", "Elixir", ""], // done
    ["erlang", "file.erl", "", "Erlang", ""], // todo
    // F# support an interpreted mode with fsharpi
    ["fsharpc", "file.fs", "\'mono /usercode/file.exe\'", "F#", ""], // todo
    ["f95 ", "file.f", " /usercode/a.out", "Fortran", ""], // done
    ["/root/.sdkman/candidates/groovy/current/bin/groovy ", "file.groovy", "", "Groovy", ""], // done
    ["hhvm", "file.php", "", "Hack", ""], // todo
    ["runghc", "file.hs", "", "Haskell", ""], // done
    ["julia", "file.jl", "", "Julia", ""], // done
    ["/root/.sdkman/candidates/kotlin/current/bin/kotlinc-jvm -src main.kt -jar main.jar", "main.kt", 'java -cp "kotlinc/lib/*:main.jar" namespace', "Kotlin", ""],     // kotlinc is a repl
    ["logo", "file.logo", "", "Logo", ""], // later
    ["lua", "file.lua", "", "Lua", ""], // done
    ["luna", "file.luna", "", "Luna", ""], // later
    ["\'nim compile\'", "file.nim", " /usercode/file", "Nim", ""], // done
    ["ocaml", "file.ml", "", "Ocaml", ""], // done
    ["octave", "file.m", "", "Octave", ""], // done
    ["opal", "file.opal", "", "Opal", ""], // later
    ["pc", "file.pas", " /usercode/file", "Pascal", ""], // done
    ["prolog", "file.prolog", "", "Prolog", ""],
    ["pypy", "file.py", "", "PyPy", ""],
    ["racket --script", "file.rkt", "", "Racket", ""], // done
    ["gst", "file.st", "", "Smalltalk", ""], // done
    ["tclsh", "file.tcl", "", "Tcl", ""], // done
    ["tsc", "file.ts", "node file.js", "TypeScript", ""], // done
];
