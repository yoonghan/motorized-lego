class Queue extends Array {
    enqueue(val) {
        this.push(val);
    }

    dequeue() {
        return this.shift();
    }

    peek() {
        return this[0];
    }

    isEmpty() {
        return this.length === 0;
    }
}

export default Queue
/*
const queue = new Queue();
queue.enqueue(2);
queue.isEmpty();
queue.dequeue();
*/
