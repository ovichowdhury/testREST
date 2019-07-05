const  cluster = require('cluster');
const os = require('os');

// express app file

const app = require('./index');

// port number
const port = 3000;

if(cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = os.cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
}
else {
    app.listen(port, (err, res) => {
        console.log(cluster.worker.id, " is listening on port: ", port);
    })
}

// Listen for dying workers
cluster.on('exit', function (worker) {

    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker %d died :(', worker.id);
    cluster.fork();

});

