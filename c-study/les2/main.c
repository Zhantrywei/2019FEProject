#include <stdio.h>
#include "max.h"
#include "min.h"

int main()
{
	int a1=35;
	int a2=31;
	int maxNum = max(a1,a2);
	int minNum = min(a1,a2);
	printf("The Max Num: %d\n",maxNum);
	printf("The Min Num: %d\n",minNum);
	getchar();
	return 0;
}
