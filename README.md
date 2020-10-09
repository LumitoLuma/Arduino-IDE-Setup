# Arduino Pro IDE - Setup

## What is Arduino Pro IDE - Setup
In 2019, [Arduino](https://arduino.cc) launched a new development environment called [Arduino Pro IDE](https://github.com/arduino/arduino-pro-ide), which will (probably) replace the classic Arduino IDE at some time.

The problem is that the original product is only a (big) portable version.

To fix this problem, I created an Inno Setup wizard for the application, so you can install it on your PC.

## Building source code
### Requirements
-   Windows Operating System.
-   Inno Setup 6.

### Procedure
1.  Download or clone the repository. If you decide to use the second option, please run the following command instead of the classic one:
    ```batch
    git clone --depth 1 https://github.com/LumitoLuma/ArduinoProIDE-Setup.git
    ```
    This will only download the latest commit, since the old ones requires lot of hard disk space.
2.  Run `ISCompil.exe` from `ISCompiler` folder.
3.  Wait some minutes...
4.  Check Release folder and enjoy!

### Additional notes
There is an experimental compilation method called 'Release', that creates a more compressed setup, but requires a very good computer, since it needs a lot of memory to compress and build the installer. If you want to compile using this method, run:
```batch
ISCompil.exe release
```
Instead of the original command in step 2.

Also, you can run:
```batch
ISCompil.exe downloadonly
```
To download and extract the files without creating the installer.

### Downloading the compiled version
View [releases](https://github.com/LumitoLuma/ArduinoProIDE-Setup/releases) for more information about downloading a compiled version of this program.

### Acknowledgements
I would like to thank to Arduino LLC. for offering the great Arduino software and boards.

© 2019 - 2020, Arduino LLC.
<br><br>
**© 2020, Lumito - [www.lumito.net](https://www.lumito.net)**
