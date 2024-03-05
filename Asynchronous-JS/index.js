const fs = require("fs");
const superagent = require('superagent');
const { reject } = require("superagent/lib/request-base");

//-----Using CallBacks/experiencing Callback hell

// fs.readFile('./dog.txt', (err, data) => {
//     console.log(`BReeD: ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//         console.log(res.body.message);

//         fs.writeFile('./dog-new.txt',res.body.message,(err)=>{
//             console.log('Random-Dog-Image saved to file!..')
//         })
//     });
// });

//------Using Promises
const readFilePro = file =>new Promise((resolve,reject) =>{
    fs.readFile(file,(err,data)=>{
        if(err) reject("I Could Not Find the File😓...") 
        resolve(data);
    })
     
})

const writeFilePro = (file,data) =>{
    return new Promise((resolve,reject) =>{
        fs.writeFile(file,data, err =>{
            if(err) reject("Could Not Write File..😵‍💫");
            resolve("SUCCESS>>>>");
        })
    })
}

/*
readFilePro(`${__dirname}/dog.txt`)
.then(data =>{
    console.log(`Breed:${data}`);
    return superagent.get('https://dog.ceo/api/breed/${data}/images/random')
})
.then(res =>{
    console.log(res.body.message);
    return writeFilePro('./dog-new.txt'-,res.body.message)

})
.then(res =>{
console.log("Random Dog Image Saved To file");
})
.catch(err =>{
    console.log('err.message');
})
*/

//Async --/-- Await 
const getDogPic = async() =>{
    try{
    const data = await(readFilePro('./dog.txt'))
    console.log(`BREED : ${data}`)

    const res1Pro = await superagent.get('https://dog.ceo/api/breed/${data}/images/random')
    const res2Pro = await superagent.get('https://dog.ceo/api/breed/${data}/images/random')
    const res3Pro = await superagent.get('https://dog.ceo/api/breed/${data}/images/random')
    const all = await Promise.all([res1Pro,res2Pro,res3Pro])
    const img = all.map((el) => el.body.message)
    console.log(all)
    console.log(img)

    // console.log(res.body.message);

    await writeFilePro('./dog-new.txt',img.join('\n'));
    console.log('Random Dog Image Saved To file');
}
catch(err){
    console.log("ERROR!!..💥💥");
    throw(err)
}
return '2:Ready🐶'
};
console.log('1:Will Get Dog-Pics!!!...')
getDogPic().then(x =>{
    console.log(x);
    console.log("2:Will get Dog Pic-2 !!!....")
})
.catch(err =>{
    console.log(err)
    
})

//IIFE-async()
/*
 
(async()=>{
    try{
        console.log('1:Will Get Dog Pics')
        const x = await getDogPic();
        console.log(x);
        console.log('3:Dog Getting Dog Pics!!...')
    }
    catch(err){
        console.log("ERROR : 💥💥");
    }
})()

*/
