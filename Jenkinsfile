pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                echo 'building the application...'
            }
        }
        stage('test') {
            steps {
                echo 'testing the application...'
            }
        }
        stage('deploy') {
            steps {
                echo 'deploying the application...'
                // copy front source to 192.168.0.221
                sh 'scp -r /var/jenkins_home/workspace/NinJa vagrant@192.168.0.221:/usr/share/nginx/html'

            }
        }
    }
}
