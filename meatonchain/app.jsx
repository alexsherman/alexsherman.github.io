import React, { useState, useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";

let dummyposts = [];
for (let i = 0; i < 20; i++) {
    let image = ['meat1.png', 'meat2.png'][i % 2];
    let user = ['geramund', 'fukure4420', 'ぅヺぬ', '??!!lol', 'alex'][i % 5];
    let id = Math.random().toString(16).substr(2, 16);
    dummyposts.push({
        user,
        date: '02/02/2022 16:32:48',
        id: 'p' + id,
        image,
        comments: [
            {
                user: 'Geramund',
                msg: 'I like the meat part when they goes big'
            }
        ]
    })
}

export default function() {
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(true);
    const [posts, setPosts] = useState(dummyposts);
    const [page, setPage] = useState(1);
    const [showIntro, setShowIntro] = useState(false)
    const PAGE_LENGTH = 10;

    let pages = [];
    for (let i = 0; i < Math.ceil(posts.length / PAGE_LENGTH); i++) {
        pages.push(i + 1)
    }

    const ethv = async () => {
        const a = localStorage.getItem(k);
        if (a && a !== 'undefined') {
            return a;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        return account;
    }

    const chat = async () => {
        try {
            const account = await ethv();
            console.log(account);
            localStorage.setItem(k, account);
            setUsername(account)
        } catch (e) {
            alert('woops, we no could attach to ur eth account! no chat for u');
        }

        setConnecting(false)
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            document.querySelector("#garage").style.transition = '2s';
            document.querySelector("#garage").style.top = '-100%';
        }, 200);

        try {
            chat();
        } catch (e) {
            console.log(e);
        }

        let i = 0;

        setTimeout(() => {
            let tm;
            
            tm = setInterval(() => {
                try {
                    const boxes = document.querySelectorAll('.loadbox');
                    for (let j = 0; j <= i; j++) {
                        boxes[j].style['background-color'] = 'green';
                    }
                    i += 1;

                    if (i === 5) {
                        clearInterval(tm);
                        setLoading(false)
                    }
                } catch(e) {
                    console.log(e);
                }   
            }, 100 + (Math.random() * 200));
        }, 1000);
    }, []);

    return <>
        <header>
        <button id="mint">
            <span class='mint-press'>PRESS</span>
            <span>To Create</span>
            <span>"Meat on Chain"</span>
        </button>
        <div id="title">
            <h1>Meat on Chain</h1>
            <p>YNGVE HOLEN</p>
        </div>
        <div id="description-toggle" onClick={() => setShowIntro(true)}>
            <img width={100} height={100} src='cartoonmeat.png' />
        </div>
   
        </header>
         <div id='loader'>
            <div class='flex-center'>
                <div class='loadbox'></div>
                <div class='loadbox'></div>
                <div class='loadbox'></div>
                <div class='loadbox'></div>
                <div class='loadbox'></div>
            </div>
            <i>loading . . .</i>
        </div>
        {
            !loading && !connecting &&
            <>
                <div id='posts'>
                    { posts.slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH).map(p => <Post post={p} username={username} addComment={(comment) => {
                        let y = posts.find(x => x.id === p.id);
                        if (y) {
                            y.comments.push({
                                user: username,
                                msg: comment
                            })
                            setPosts(JSON.parse(JSON.stringify(posts)))
                        }
                    }}/>)}
                </div>
                <div id="pages">
                    <div>
                        { pages.map(p => <span style={{ color: p === page ? 'purple' : 'unset'}} className='page-link' onClick={() => {
                            setPage(p);
                            document.querySelector('#app').scroll(0, 0);
                        }}>[{p}]</span>) }
                    </div>
                </div>
                
            </>
        }
       
        <div id='garage'>
        </div>
        {
            showIntro &&
            <Introduction visible={showIntro} setVisible={setShowIntro} />
            
        }
       
    </>
   
}

function Introduction({ visible, setVisible }) {
    const [tab, setTab] = useState('intro');

    if (!visible) {
        return false;
    }

   return <div id='introduction'>
        <div style={{'text-align': 'center'}}>
            <h1>
                <span onClick={() => setTab('intro')}>Introduction</span>
                <span onClick={() => setTab('info')} style={{color: 'gray'}}>Information</span> 
                <span onClick={() => setVisible(false)}>[x]</span>
            </h1>
        </div>
        <p className={tab === 'intro' ? 'vis' : ''}>
            "Meat on Chain", Yngve Holen's first NFT project, brings his strong physical work
            into a new phase within a digital context, challenging my ability to even phrase
            this boundary neatly. Already an expert in recontextualizing manufactured and processed
            objects from everything between the car factory to the meat plant blha blhablahb
        </p>
        <p className={tab !== 'intro' ? 'vis' : ''}>
            Looking back on holen's work, I am drawn in by his  asuse of the simple cut. In INTERVIEW,
            the interviewer writes "Seeing" blah blahblasdf afs sf af ef a 
        </p>
    </div>
}

function Post({ post, username, addComment = () => 'ok' }) {
    const [txt, setTxt] = useState('');
    const [isBig, setIsBig] = useState(false);

    return <div class='post'>
        <h5>
            <span class='post-description'>{post.user}</span>
            <span>{post.date}</span>
            <span>#{post.id}</span>
        </h5>
        <div className={`tt ${isBig ? 'big' : 'small'}`} onClick={
            () => setIsBig(false)
        }>
            <img height={200} width={200} src={post.image} />
        </div>
        <div class='flex'>
            <img style={{cursor: 'pointer'}} height={30} width={30} src='unnamed1.png'  onClick={
               () => setIsBig(true)
            }/>
            <div id={post.id + 'img'} className='bg'>
                <img height={200} width={200} src={post.image} />

            </div>
            
            <div class='comments'>
                { post.comments.map(c => <div>
                    <span>{c.user}:</span>
                    <div class='comment flex'>
                        <img src='unnamed.png' height={30} width={30} />
                        <span>{c.msg}</span>
                        <img src='unnamed.png' height={30} width={30} />
                    </div>  
                </div> )}
                {
                    txt != -1 &&
                    <>
                    <span id='name1'>{ username ? username + ':' : 'connect to metamask to chat with ur fellow meatheads'}</span>
                    {  
                        username &&
                        <div class='comment-input flex'>
                            <img src='unnamed.png' height={30} width={30} />
                            <input
                                onChange={e => setTxt(e.target.value)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        addComment(txt)
                                        setTxt(-1);
                                    }
                                }}
                                value={txt}
                                type='text'
                                placeholder='Type your reply'
                            />
                            <img src='unnamed.png' height={30} width={30} />

                        
                        </div>
                    }
                    </>
                }
            </div>
        </div>
    </div>
}


/*

 <script>
        setTimeout(() => {
            console.log(document.querySelector("#garage").style)
            document.querySelector("#garage").style.transition = '2s';
            document.querySelector("#garage").style.top = '-100%';
        }, 200);

        document.querySelector('#mint').addEventListener('click', () => {
            alert('what is this supposed to do?');
        });

        let on = false;
        document.querySelector('#description-toggle').addEventListener('click', () => {
            on = !on;
            document.querySelector('#introduction').style.opacity = on ? 1 : 0;
            document.querySelector('#description-toggle').style.transform = on ? 'rotate(90deg)' : null;
        });

        let username;
        let loading = true;
        let connecting = true;
        const k = 'ethacc';
        const ethv = async () => {
            const a = localStorage.getItem(k);
            if (a && a !== 'undefined') {
                return a;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            return account;
        }

        const chat = async () => {
            try {
                const account = await ethv();
                console.log(account);
                localStorage.setItem(k, account);
                username = account;
            } catch (e) {
                alert('woops, we no could attach to ur eth account! no chat for u');

            }

            if (!username) {
                document.querySelector('#name1').innerText = '';
                document.querySelector('.comment-input').innerText = 'connect to metamask to chat with ur fellow meatheads'
            } else {
                document.querySelector('#name1').innerText = username + ': '

            }

            connecting = false;
        }

        try {
            chat();
        } catch (e) {
            console.log(e);
        }

        let x = setInterval(() => {
            if (!connecting && !loading) {
                document.querySelector("#posts").style.opacity = 1;
                document.querySelector("#loader").style.display = 'none';
                clearInterval(x);
            }
        }, 100);


        const posts = [
            {
                image: 'meat1.png',
                owner: 'Ownername',
                date: '02/02/2022 16:32:48',
                id: '#238f92fjdfhsfkj20f20dsjfk20'
            },
            {
                image: 'meat2.png',
                owner: 'Geramund',
                date: '02/01/2022 18:36:41',
                id: '#0vg823udfnsaf8237f283f92hdf'
            }
        ];

        let i = 0;

        setTimeout(() => {
            let tm;
            tm = setInterval(() => {
                try {
                     const boxes = document.querySelectorAll('.loadbox');
                    for (let j = 0; j <= i; j++) {
                        boxes[j].style['background-color'] = 'green';
                    }
                    i += 1;

                    if (i === 5) {
                        clearInterval(tm);
                        loading = false;
                    }
                } catch(e) {
                    console.log(e);
                }   
            }, 100 + (Math.random() * 200));
        }, 1000);


        const onSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            console.log(formProps);

            const comment = document.querySelector('.comment');
            const newcomment = comment.cloneNode(true);
            const title = document.createElement('span');
            title.innerText = username + ': ';
            comment.after(title);
            title.after(newcomment);
            //newcomment.innerText = formProps.txt;
            title.style['margin-left'] = '48px';
            newcomment.style['margin-left'] = '48px';
            const allcomments = document.querySelectorAll('.comment span');
            allcomments[allcomments.length - 1].innerText = formProps.txt;

            document.querySelector('.comment-input').style.display = 'none';
            document.querySelector('#name1').style.display = 'none';

        }

        for (const input of document.querySelectorAll('.comment-input form')) {
            console.log(input);
            input.addEventListener('submit', onSubmit);
        }
       


  </script>


*/