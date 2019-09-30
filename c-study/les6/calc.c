#include <stdio.h>

int main()
{
	int flag=1;
	int count=0;
	int num;
	int sum=0;
	while(flag){
		scanf("%d",&num);
		if(num==0){
			break;
		}
		sum+=num;
		count++;
	}
	printf("%d,%d",sum,count);
	return 0;
}
