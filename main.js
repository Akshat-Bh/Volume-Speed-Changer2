song= "";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;

function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas= createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX, rightWrist, 20);

    if(scoreRightWrist > 0.2)
    {
    if(rightWristY > 0 && rightWristY<=120)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 120 && rightWristY<=240)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 240 && rightWristY<=360)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 360 && rightWristY<= 480)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 480 && rightWristY<=600)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

}
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWrist = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/600;
    document.getElementById("volume").innerHTML = "Volume= " + volume;
    song.setVolume(volume);
    }
    
} 

function play()
{
    song.play();
    song.setVolume(1);
    set.rate(1);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        results[0].pose.keypoint[9].score;
        results[0].pose.keypoint[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;    
        console.log("leftWristX= " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= " +rightWristX+ "rightWristY= " + rightWristY);
    }
} 
