#include <stdio.h>
#include <string.h>

int main()
{
    char s1[100] = "";
    char s2[]="ÎÒ°®£¬";
    char s3[]="Ä½¿ÎÍø";

    strcpy(s1,s2);
    strcat(s1,s3);
    printf("%s\n",s1);
    printf("%s\n",s2);
    printf("%d\n",strlen(s3));
    getchar();
    return 0;
}