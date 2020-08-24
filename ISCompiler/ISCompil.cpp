#include <string>
#include "findarc.h"

using namespace std;

string exec;

int main(int argc, char* argv[])
{
    if (argc > 1 && argv[1] = "hola")
    {
        printf("Compiling as release mode (EXPERIMENTAL!)\n");
        exec = "\"" + (string)ProgFiles + (string)"\\Inno Setup 6\\iscc.exe\" ..\\Release.iss";
    }
    else
    {
        exec = "\"" + (string)ProgFiles + (string)"\\Inno Setup 6\\iscc.exe\" ..\\main.iss";
    }
    int err = system(exec.c_str());
    printf("\nThe program exited with code %d.\n", err);
    exit(err);
}