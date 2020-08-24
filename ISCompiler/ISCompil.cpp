#include <string>
#include "findarc.h"

using namespace std;

int main(int argc, char* argv[])
{
    string exec = "\"" + (string)ProgFiles + (string)"\\Inno Setup 6\\iscc.exe\" ..\\main.iss";
    int err = system(exec.c_str());
    printf("\nThe program exited with code %d.\n", err);
    exit(err);
}