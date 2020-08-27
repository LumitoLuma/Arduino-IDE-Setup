#pragma warning(disable : 4996) // Disables insecure file warnings

#include <curl/curl.h>
#include <math.h>
#include <stdio.h>

/* Thanks fvu from Stack Overflow! */
size_t write_data(void* ptr, size_t size, size_t nmemb, FILE* stream)
{
    size_t written = fwrite(ptr, size, nmemb, stream);
    return written;
}

/* Thanks fvu again, from Stack Overflow! */
int progress_func(void* ptr, double TotalToDownload, double NowDownloaded,
    double TotalToUpload, double NowUploaded)
{
    if (TotalToDownload <= 0.0)
    {
        return 0;
    }
    int totaldotz = 30;
    double fractiondownloaded = NowDownloaded / TotalToDownload;
    int dotz = (int)round(fractiondownloaded * totaldotz);

    int ii = 0;
    printf("- Downloading Arduino Pro IDE...\t");
    printf("%3.0f%% [", fractiondownloaded * 100);
    for (; ii < dotz; ii++)
    {
        printf("=");
    }
    if (ii < totaldotz)
    {
        printf(">");
    }
    else
    {
        printf("=");
    }
    for (; ii < totaldotz; ii++)
    {
        printf(" ");
    }
    printf("]\r");
    fflush(stdout);
    return 0;
}

void DownloadCurl(const char* url, char outputfile[FILENAME_MAX])
{
    CURL* curl;
    FILE* file;
    CURLcode code;
    curl = curl_easy_init();
    if (curl)
    {
        file = fopen(outputfile, "wb");
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, file);
        curl_easy_setopt(curl, CURLOPT_NOPROGRESS, FALSE);
        curl_easy_setopt(curl, CURLOPT_PROGRESSFUNCTION, progress_func);
        code = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        fclose(file);
        printf("- Downloading Arduino Pro IDE... Done!  100%% [===============================]\n");
    }
}