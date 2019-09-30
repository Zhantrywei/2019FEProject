#include <stdio.h>

int main()
{
	int sum,num;
	scanf("%d,%d",&sum,&num);
	float v = sum/num;
	if(num ==0){
		fprintf(stderr,"the num is 0");
		return -1;
	}
	printf("%d/%d=%f\n",sum,num,v);
	return 0;
}
