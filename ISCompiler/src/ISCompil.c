/* (C) 2020, Lumito - www.lumito.net */

#include <stdbool.h>
#include <stdio.h>
#include <Windows.h>

void DownloadCurl(const char*, char[FILENAME_MAX], byte);
void ExtractZIP(char[FILENAME_MAX], const char*);

void PreCompile()
{
    DownloadCurl("https://dl.lumito.net/public/repos/ArduinoProIDE-Setup/ISCompil/portable-isc.zip", "portable-isc.zip", 0);
    DownloadCurl("https://downloads.arduino.cc/arduino-pro-ide/arduino-pro-ide_0.1.2_Windows_64bit.zip", "arduino_pro_ide_x64.zip", 0);
    ExtractZIP("portable-isc.zip", ".");
    ExtractZIP("arduino_pro_ide_x64.zip", "..");
}

int RunCompiler(bool release)
{
    int err = 1;
    if (release)
    {
        err = system("isc\\ISCC.exe ..\\Release.iss");
    }
    else
    {
        err = system("isc\\ISCC.exe ..\\main.iss");
    }
    printf("\nThe program exited with code %d.\n", err);
    return err;
}

int main(int argc, char* argv[])
{
    int error = 1;
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
    else if (argc > 1 && strcmp(argv[1], "downloadonly") == 0)
    {
        HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
        FlushConsoleInputBuffer(hConsole);
        SetConsoleTextAttribute(hConsole, 14); // Yellow
        printf("--- THE REQUIRED FILES WILL BE DOWNLOADED, BUT NOT COMPILED ---\n\n");
        SetConsoleTextAttribute(hConsole, 15); // White
        PreCompile();
        int error = 0;
    }
    else
    {
        PreCompile();
        error = RunCompiler(false);
    }
    return error;
}