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

    // 从链表中插入元素
    this.insert = function(position, element){
        if(position>=0 && position<=length){
            let node = new Node(element), current = head, previous, index = 0;
            if(position === 0){
                //第一个位置添加
                node.next = current;
                head = node;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        }else{
            return false;
        }
    }

    // toString()方法
    this.toString = function (){
        let current = head, string = '';
        while(current){
            string+=current.element+(current.next?'n': '');
            current = current.next;
        }
        return string;
    }

    // indexOf()方法
    this.indexOf = function(element){
        let current = head, index = -1;
        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    // remove()方法
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    // isEmpty()方法
    this.isEmpty = function(){
        return length === 0;
    }

    // size()方法
    this.size = function(){
        return length
    }

    // getHead()方法
    this.getHead = function(){
        return head;
    }
}

let list = new LinkedList();
list.append(15);
list.append(10);