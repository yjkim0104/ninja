pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                echo 'building the application...'
                sh 'echo `id`'
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
                sh 'su jenkins'
                sh 'echo `id`'
                sh 'scp -r /var/jenkins_home/workspace/NinJa/ root@192.168.0.221:/usr/share/nginx/html'

            }
        }
    }
}


