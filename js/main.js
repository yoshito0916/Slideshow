'use strict';

{
  const images = [ 
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
  let currentIndex = 0;

  const mainImage = document.getElementById('main');

  mainImage.src = images[currentIndex];
 
  images.forEach((image, index) => { 
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    if (index === currentIndex) { 
      li.classList.add('current');
    }

    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li'); 
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);

    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length -1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId; 

  function playSlideshow() {
    timeoutId = setTimeout(() => {  
      next.click();
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) { 
      playSlideshow();
      play.textContent = 'Pause';
    } else { 
      clearTimeout(timeoutId); 
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying; 
  });
}

// {
//   const images = [ //画像を配列で保持する
//     'img/pic00.png',
//     'img/pic01.png',
//     'img/pic02.png',
//     'img/pic03.png',
//     'img/pic04.png',
//     'img/pic05.png',
//     'img/pic06.png',
//     'img/pic07.png',
//   ];
//   let currentIndex = 0;//imagesのindexが何番目の画像を表示しているかをcurrentIndexという変数で保持する。最初はpic00を表示するので0に設定。

//   const mainImage = document.getElementById('main');//mainの画像をmainImageという名前で扱えるように取得する。その上でsrc属性にimagesのcurrentIndex番目の要素を代入してあげる。

//   mainImage.src = images[currentIndex];


//   //サムネイル画像に関して。imagesの配列の要素の数の分だけループを回したいのでforEach()を使う
//   images.forEach((image, index) => { //imagesのそれぞれの要素をimageで取得してあげて、次の処理を指示。引数にindex追加。アロー関数は引数が2つ以上あると()で囲う必要がある

//     const img = document.createElement('img');//img要素を生成する
//     img.src = image;//imgのsrc属性をimageになるようにする

//     const li = document.createElement('li');//次にli要素を生成する。
//     if (index === currentIndex) { //imageが何番目であるかのindexがcurrentIndexと同じだったらliに対してcurrentクラスをつけてあげると該当する濃くなる。今0なので0番目のli要素にcurrentクラスがついて色が濃くなる。
//       li.classList.add('current');
//     }

//     li.addEventListener('click', () => {
//       mainImage.src = image;
//       const thumbnails = document.querySelectorAll('.thumbnails > li'); //currentクラスがついているli要素からcurrentクラスを取り除く処理をする。まずサムネイルの全ての要素を取得。その上でthumbnailsという定数を使う。querySelectAll()で取得できる。
//       //次にthumbnailsの中のcurrentIndex番目の要素に対してclassList.remove('current')とすると今currentクラスがついている画像からcurrentクラスが取り除ける。その上で、thumbnailsの更新されたcurrentIndex番目に対してcurrentクラスをつけてあげる。addにすれば良い
//       thumbnails[currentIndex].classList.remove('current');
//       currentIndex = index;
//       thumbnails[currentIndex].classList.add('current');
//     });

//     li.appendChild(img);//次にliの子要素としてimgを追加する。appendChild()を使う

//     document.querySelector('.thumbnails').appendChild(li);//最後にthumbnailsクラスがついたulの子要素としてliを追加してあげればよい。querySelector()を使ってthumbnailsクラスがついた要素を指定しつつ、appendChild()でliを追加してあげると、imagesの配列の要素数分だけ追加される
//   });

//   const next = document.getElementById('next');
//   next.addEventListener('click', () => {
//     let target = currentIndex + 1;
//     if (target === images.length) {
//       target = 0;
//     }
//     document.querySelectorAll('.thumbnails > li')[target].click();
//   });
//   const prev = document.getElementById('prev');
//   prev.addEventListener('click', () => {
//     let target = currentIndex - 1;
//     if (target < 0) {
//       target = images.length -1;
//     }
//     document.querySelectorAll('.thumbnails > li')[target].click();
//   });

//   let timeoutId; //※注１

//   function playSlideshow() {
//     timeoutId = setTimeout(() => {  //※注２
//       next.click();
//       playSlideshow();
//     }, 1000);
//   }

//   let isPlaying = false;//スライドを停止する機能isPlayingという変数を用意しそれがtrueかfalseで条件分岐する。最初は再生していないのでfalseとする。

//   const play = document.getElementById('play');
//   play.addEventListener('click', () => {
//     if (isPlaying === false) { //Playボタンがクリックされた時にisPlayingがfalseだったら再生が始まり、ボタン表示もPauseに切り替わる。
//       playSlideshow();
//       play.textContent = 'Pause';
//     } else { //次にPauseを押したらスライドが停止して表示ボタンがPlayに戻るようにする
//       clearTimeout(timeoutId); //setTimeout()で始めたスライドを止めるにはclearTimeout()を使う
//       //clearTimeout()にはsetTimeout()の返り値が必要なので、timeoutId ※注１ という変数を宣言しておく。あとはtimeoutIdでsetTimeout()の返り値を受け取って ※注２ clearTimeout()に渡してやる。
//       play.textContent = 'Play';
//     }
//     isPlaying = !isPlaying; //ボタンがクリックされる度にisPlayingの値をtrue か falseで切り替えれば良いので否定の演算子を使って値を反転させる
//   });
// }
