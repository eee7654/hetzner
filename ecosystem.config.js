module.exports = {
    apps: [{
        name: 'Hetzner',
        script: 'node_modules/next/dist/bin/next',
        exec_mode : "cluster",
        args:"start -p 4001",
        instances : "1",
        watch: false,
        output: './logs/out.log',
        error: './logs/error.log',
    }]
};