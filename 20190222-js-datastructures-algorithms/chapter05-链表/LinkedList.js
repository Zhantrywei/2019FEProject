function LinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;    //存储第一个节点的引用

    // 向链表尾部追加元素
    this.append = function(element){
        let node = new Node(element), current;
        if(head === null){  //链表为空时,插入的元素就是第一个
            head = node;
        }else{  //链表不为空时,遍历到最后一个,最后一个的特点就是最后一个的next为null
            current = head; 
            while(current.next){
                current = current.next;
            }

            current.next = node;
        }
        length++;
    }

    // 从链表中移除元素
    this.removeAt = function(position){
        //检查边界值
        if(position>-1&&position<length){
            let current = head, previous, index = 0;

            //移除第一项
            if(position === 0){
                head = current.next;
            }else{
                while(index<position){
                    index++;
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }

            length--;
            return current.element;
        }else{
            return null;
        }
    }
}

let list = new LinkedList();
list.append(15);
list.append(10);