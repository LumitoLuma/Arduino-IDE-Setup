#include <stdio.h>
#include "include/zip.h"

int on_extract_entry(const char* filename, void* arg)
{
    static int i = 0;
    int n = *(int*)arg;
    printf("\r- Extracting file %d of %d (this may take a while)...", ++i, n);
    fflush(stdout);
    return 0;
}

void ExtractZIP(const char* file, const char* destination)
{
    struct zip_t* zip = zip_open(file, 0, 'r');
    int arg = zip_total_entries(zip);
    zip_extract(file, destination, on_extract_entry, &arg);
    printf(" Done!\n");
}
