class Counter {
    count = $state(0);
    increment() { 
        this.count += 1 
    }
}

export const globalCounter = new Counter();