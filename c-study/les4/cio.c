#include <stdio.h>
/* 
    stdin: 默认键盘
    stdout: 默认显示器
    stderr
 */

int main()
{
    // printf("hello world\n");
    fprintf(stdout, "hello world\n");
    int a;
    // scanf("%d", &a);
    fscanf(stdin,"%d",&a);
    printf("input value is %d\n", a);
    if(a<0){
        fprintf(stderr,"the value must > 0\n");
        return -1;
    }
    return 0;
}