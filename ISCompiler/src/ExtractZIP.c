/* (C) 2020, Lumito - www.lumito.net */

#include <stdio.h>
#include "include/zip.h"

char* fname;

int on_extract_entry(const char* filename, void* arg)
{
    static int i = 0;
    int n = *(int*)arg;
    printf("\r- Extracting %s (file %d of %d, this may take a while)...", fname, ++i, n);
    fflush(stdout);
    return 0;
}

void ExtractZIP(char file[FILENAME_MAX], const char* destination)
{
    struct zip_t* zip = zip_open(file, 0, 'r');
    int arg = zip_total_entries(zip);
    fname = file;
    zip_extract(file, destination, on_extract_entry, &arg);
    printf(" Done!\n");
}