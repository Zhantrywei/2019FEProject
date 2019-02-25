function DoublyLinkedList(){
    let Node = function(element){
        this.element = element;
        this.prev = null;
        this.next = null;
    }

    let length = 0;
    let head = null;
    let tail = null;

    //任意位置插入新元素
    this.insert = function(position, element){
        //检查边界
        if(position>=0 && position<=length){
            let node = new Node(element), current = head, previous, index = 0;
            if(position === 0){
                if(!head){
                    head = node;
                    tail = node;
                }else{
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            }else if(position === length){
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            }else{
                while(index++<position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        }else{
            return false;
        }
    }

    //从任意位置移除元素
    this.removeAt = function(position){
        if(position> -1 &&position<length){
            let current = head, previous, index = 0;
            if(position === 0){
                head = current.next;
                if(length === 1){
                    tail = null;
                }else{
                    head.prev = null;
                }
            }
        }
    }
}