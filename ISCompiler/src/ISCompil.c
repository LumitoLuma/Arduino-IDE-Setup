#include "include/findarc.h"
#include <stdbool.h>
#include <stdio.h>

void DownloadCurl(const char*, char[FILENAME_MAX]);
void ExtractZIP(const char*, const char*);

void PreCompile()
{
    DownloadCurl("https://downloads.arduino.cc/arduino-pro-ide/arduino-pro-ide_0.1.1_Windows_64bit.zip", "arduino_pro_ide_x64.zip");
    ExtractZIP("arduino_pro_ide_x64.zip", "..");
}

int RunCompiler(bool release)
{
    int err;
    if (release)
    {
        err = system("\"" ProgFiles "\\Inno Setup 6\\iscc.exe\" ..\\Release.iss");
    }
    else
    {
        err = system("\"" ProgFiles "\\Inno Setup 6\\iscc.exe\" ..\\main.iss");
    }
    printf("\nThe program exited with code %d.\n", err);
    return err;
}

int main(int argc, char* argv[])
{
    int error;
    if (argc > 1 && strcmp(argv[1], "release") == 0)
    {
        HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
        FlushConsoleInputBuffer(hConsole);
        SetConsoleTextAttribute(hConsole, 14); // Yellow
        printf("--- WARNING! COMPILING AS EXPERIMENTAL RELEASE MODE ---\n\n");
        SetConsoleTextAttribute(hConsole, 15); // White
        PreCompile();
        error = RunCompiler(true);
    }
    else
    {
        PreCompile();
        error = RunCompiler(false);
    }
    return error;
}
