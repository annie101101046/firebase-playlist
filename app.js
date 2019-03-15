const list = document.querySelector('#list');
const form = document.querySelector('#add-form');
const user = "annie101101046@gmail.com";
// db.collection("user").doc(user).get()
// 先拿到user的資料 把invited render出來
// 做一個 btn 接受邀請 

// 拿 data
db.collection('users').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        console.log(doc)

        if(doc.exists) {
            const data = doc.data()
            if(data.email === user) {
                for(const inviter of data.invited) {
                    console.log(data)
                    inviteList = document.getElementById('inviteList');
                    inviting = document.createElement('div');
                    inviting.innerText = inviter;

                    acceptbtn = document.createElement('button');
                    acceptbtn.innerText = 'Add Friend';
                    acceptbtn.onclick = (e) => { 
                        agreeFriend(inviter, user);
                        e.target.style.display = 'none'; 
                    }

                    inviteList.appendChild(inviting)
                    inviteList.appendChild(acceptbtn)
                }
            }
        }
    })
})



var users = db.collection("users");

// db.collection('users').doc(form.email.value).set({
//     name: form.name.value,
//     email: form.email.value,
//     userId: form.userId.value,
//     invite: ["test@test.com", ],
//     // (if invite > 0) 去找對方的 email值（email要調換成 firebase 給的 id）
//    //  當 invite accepted,把對方的 email 值從 invite 處刪掉
//      invited:["test@test.com",], 
//      //(if invited > 0) 去找對方的 email 值， if 接受，從 [] 刪掉
//      friendList:["test@test.com",], 
//      //秀出目前接受與被接受的 invite
// });

//拿到 email
//citiesRef.doc(email).get().then(sentInvite);


function SentInvite(){
        //invite
        let friends = document.getElementById("search").value;
    
        console.log(friends)
            // A 加 B  好友
        db.collection("users").doc(user).get().then(function(doc){
            //確認資料有沒有拿出來
            if(doc.exists){
                //更新 A
                const data = doc.data();
                data.inviting.push(friends);
                let inviting = data.inviting;
                
                //更新回去
                db.collection("users").doc(user).update({
                    inviting: inviting
                });
            }
        });
    
        db.collection("users").doc(friends).get().then(function(doc){
        //確認資料有沒有拿出來
            if(doc.exists){
                //更新 B
                const data = doc.data();
                data.invited.push(user);
                let invited = data.invited;
                
                //更新回去
                db.collection("users").doc(friends).update({
                    invited: invited
                });
            }
        });
}
    



//有邀請後，同意加好友、好友增加
//資料拿出來
function agreeFriend(inviter, me){
    db.collection("users").doc(me).get().then(function(doc){
        //確認資料有沒有拿出來
        if(doc.exists){
            //更新 inviter
            const data = doc.data();

            data.friends.push(inviter);

            const friends = data.friends;
            const invited = data.invited.filter(item => item != inviter);
            
            //更新回去
            db.collection("users").doc(me).update({
                friends: friends,
                invited: invited
            });
        }
    });

    //更新 me user
    db.collection("users").doc(inviter).get().then(function(doc){
        //確認資料有沒有拿出來
        if(doc.exists){
            //更新 me
            const data = doc.data();
            data.friends.push(me);
            const friends = data.friends;
            const inviting = data.inviting.filter(item => item != me)
            
            //更新回去
            db.collection("users").doc(inviter).update({
                friends: friends,
                inviting: inviting
            });
        }
    });
}

//點擊送出好友
document.getElementById("sent").onclick = function(e) {
    console.log(e)
    SentInvite() 
};

// 點擊 search




// function getData(){
//     db.collection("users").doc(user).get().then(function(doc){
//         //確認資料有沒有拿出來
//         if(doc.exists){
//             renderList(doc);
//             }
//         }
//     )}

// create element & render 
// function renderList(doc){
//     let li = document.createElement('li');
//     let email = document.createElement('span');
//     let invited = document.createElement('span');
//     let friendList = document.createElement('span');
//     let cross = document.createElement('div');
//     let list = document.getElementById('list');

//     li.setAttribute('data-id', doc.id);
//     name.textContent = doc.data().name;
//     email.textContent = doc.data().email;
//     userId.textContent = doc.data().userId;
//     invited.textContent = doc.data().invited;
//     invite.textContent = doc.data().invite;
//     friendList.textContent=doc.data().textContent;
//     cross.textContent = 'x';

//     li.appendChild(name);
//     li.appendChild(email);
//     li.appendChild(userId);
//     li.appendChild(invite);
//     li.appendChild(invited);
//     li.appendChild(friendList);
//     li.appendChild(cross);
//     list.appendChild(li);



// // saving data
// form.addEventListener('submit', (e) => {
//     e.preventDefault();





// real-time listener
//要判斷是否有邀請(要有 pending 的狀況)
// db.collection('users').orderBy('email').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if(change.type == 'added'){
//             renderList(change.doc);
//         } else if (change.type == 'removed'){
//             let li = list.querySelector('[data-id=' + change.doc.id + ']');
//             list.removeChild(li);
//         }
//     });
// });

//送出邀請 function
//做個邀請 button
// A 加 B  好友
// db.collection("users").doc("a@test.com").get().then(function(doc){
//     //確認資料有沒有拿出來
//     if(doc.exists){
//         //更新 A
//         let invite = doc.data()["invite"].push("b@test.com")
        
//         //更新回去
//         db.collection("users").doc("a@test.com").update({
//             invite: invite
//         })
//     }
// })

// db.collection("users").doc("b@test.com").get().then(function(doc){
//     //確認資料有沒有拿出來
//     if(doc.exists){
//         //更新 B
//         let invited = doc.data()["invited"].push("a@test.com")
        
//         //更新回去
//         db.collection("users").doc("b@test.com").update({
//             invited: invited
//         })
//     }
// })



// let post = {
//     "article_id":"",
//     "article_title":"",
//     "article":"",
//     "content":"",
//     "article_tag":"Beauty",
//     "author":"",
//     "created_time":""
// }

//post
//db.collection("post").add(post);

//選到某人後的 tag research
//當 input 有值時，撈到該 user 相對應的 tag 文章，然後 render 出來
// 沒有撈到就沒畫面

var selectTag = undefined;


// search specify tag
const tags = ["Beauty", "Gossiping", "Joke", "SchoolLife"];
let defaultTag = "Beauty";

var citiesRef = db.collection("article");
var postList = document.querySelector('#list');
var searchArticle = document.getElementById('article-search')
var searchSubmit = document.getElementById('searchSubmit')

// Create a query against the collection.
var query = citiesRef.where("article_tag", "==", defaultTag);
query.get().then( result => result.docs )
.then(docs => docs.forEach(doc => renderPost(doc)));

const tagEle = document.getElementById("tags");


for(let i=0; i < tags.length; i++) {
    tagBtn = document.createElement('button');
    tagBtn.innerText = tags[i];
    tagBtn.setAttribute('tagName', tags[i]);
    tagBtn.onclick = (e) => {
        var t = e.target.getAttribute('tagName');
        selectTag = t;
        console.log(t)
        var q = citiesRef.where("article_tag", "==", t);
        q.get().then( result => result.docs )
        .then(docs => {
                while (postList.firstChild) {
                    postList.removeChild(postList.firstChild);
                }
                docs.forEach(doc => {renderPost(doc)})
        });
        

    }
    tagEle.appendChild(tagBtn);
}

searchSubmit.onclick = (e) => {
   const userEmail = searchArticle.value;
    while (postList.firstChild) {
        postList.removeChild(postList.firstChild);
    }

    if(selectTag === undefined){
        var query = citiesRef.where("author", "==", userEmail);
        console.log(query);
        query.get().then( result => result.docs)
        .then(docs => docs.forEach(doc => renderPost(doc)));   
    }else{
        var query = citiesRef.where("author", "==", userEmail).where("article_tag", "==", selectTag)
        console.log(query);
        query.get().then( result => result.docs)
        .then(docs => docs.forEach(doc => renderPost(doc)));  
    }
}



// create element & render post
function renderPost(post){
    
    let li = document.createElement('li');
    let article_id = document.createElement('span');
    let article_title = document.createElement('span');
    let article = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', post.id);
    article_id.textContent = post.data().article_id;
    article_title.textContent = post.data().article_title;
    cross.textContent = 'x';

    li.appendChild(article_id);
    li.appendChild(article_title);
    li.appendChild(cross);

    postList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('post').doc(id).delete();
    });
}

//留言寫完 submit
document.getElementById("submitYa").onclick = function(e) {
    e.preventDefault();

    var article_id = document.getElementById('article_id').value;
    var article_title = document.getElementById('article_title').value;
    var article = document.getElementById('article').value;
    var content = document.getElementById('content').value;
    var article_tag = document.getElementById('article_tag').value;
    db.collection("article").add({
        "article_id": article_id,
        "article_title": article_title,
        "article": article,
        "content": content,
        "article_tag": article_tag,
        "author": user,
        "created_time": Date().toString()
    });
};


// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('article').add({
        article_tag: form.article_id.value,
        article_title: form.article_title.value
    });
    form.article_id.value = '';
    form.article_title.value = '';
});

// real-time listener
// db.collection('post').orderBy('article_title').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if(change.type == 'added'){
//             renderList(change.doc);
//         } else if (change.type == 'removed'){
//             let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//             cafeList.removeChild(li);
//         }
//     });
// });


//發文
//做一個 post 的 collection
// 每個 post 會有
// {
//  article_id:
//  article_title:
//  article:content:
//  article_tag: (Beauty / Gossiping / Joke/ SchoolLife)
//  author:
//  created_time:
// }

//


//搜尋功能
// 去撈  article_tag:
// 去撈  特定好友的 document
// 去撈 特定好友的 document + tag




// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });


// //getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });




    // // deleting data
    // cross.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('users').doc(id).delete();
    // });