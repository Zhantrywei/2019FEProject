var apartment = {
    isLocked: false,
    lock: function() {
        var that = this;
        this.isLocked = true;
        function doSomething() {
            // this === apartment
            console.log(
                "TCL: doSomething -> this === apartment",
                this === apartment
            );
            // this === window || this === global
            try {
                console.log("TCL: doSomething -> this === window", this === window);
            } catch (error) {
                console.log("TCL: doSomething -> this === global", this === global);                
            }
            // that === apartment
            console.log(
                "TCL: doSomething -> that === apartment",
                that === apartment
            );
            that.isLocked = false;
        }
        doSomething();
    }
};

apartment.lock();
// apartment.isLocked
console.log("TCL: apartment.isLocked", apartment.isLocked);
