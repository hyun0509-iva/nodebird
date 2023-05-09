export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "skyblue5030",
      },
      content: "첫 번째 게시글 #express #react",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [], //이미지업로드시 추가됨
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};
// 데이터를 먼저 구성, 화면은 작성한 데이터나 데이터 변경을 기준으로 구성
// 데이터 구조는 서버측과 합의해서 구성해야 나중에 수정할 일이 없음
const post = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST_SUCCESS':
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        // 데이터을 앞에 추가해서 게시글이 위로 올라가게 
        postAdded: true,
      };
    default:
      return state;
  }
};

export const postState = (state) => state.post;
export default post;
