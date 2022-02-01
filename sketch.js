let video;
let poseNet;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, 'multiple', modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses;
        skeleton = poses.skeleton;
    }
}
function modelLoaded() {
    console.log('poseNet ready');
}
function draw() {
    image(video, 0 ,0);

    pose?.forEach(async p => { // for multiple poses
        let ps = p.pose;

        if (ps) {
            for (let i = 0; i< ps.keypoints.length; i++) {
                let x = ps.keypoints[i].position.x;
                let y = ps.keypoints[i].position.y;

                fill(0,255,0);
                ellipse(x, y , 8, 8);
            }

            for (let i = 0; i < p.skeleton.length; i++) {
                let a = p.skeleton[i][0];
                let b = p.skeleton[i][1];

                line(a.position.x, a.position.y, b.position.x, b.position.y);
                strokeWeight(2);
                stroke(255,0,0);
            }
            // let eyeR = ps.rightEye;
            // let eyeL = ps.leftEye;
            // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
            //
            // fill(121,3,55); // change color
            // circle(ps.leftEye.x, ps.leftEye.y, d);
            //
            // circle(ps.rightEye.x, ps.rightEye.y, 20);
            // circle(ps.leftShoulder.x, ps.rightShoulder.y, 20);
        }
    })

}