import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostAll, deletePost } from "../modules/board";

const AdminBoard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.board.posts);
  useEffect(() => {
    dispatch(getPostAll());
  }, []);

  const deletePostBtn = (postId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deletePost(postId));
      alert("삭제완료");
    } else {
      window.location.href = "/admin/board";
    }
  };
  const editPostBtn = (postId) => {
    nav(`/admin/board/edit/${postId}`);
  };
  const writeNotice = () => {
    nav("/admin/board/write");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-28">
        <h1 className="text-3xl my-4">공지 관리</h1>
        <div className="flex flex-col justify-center items-center">
          <table className="w-[900px]">
            <thead>
              <tr className="text-center bg-white h-12 border-[1px] border-b-black">
                <td>번호</td>
                <td>제목</td>
                <td className="w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">내용</td>
                <td>작성일</td>
                <td>삭제</td>
                <td>수정</td>
              </tr>
            </thead>
            <tbody>
              {posts.map(({ content, title, createdAt, postId }, idx) => (
                <tr key={idx} className="text-center h-12 border-[1px] border-b-black">
                  <td>{postId}</td>
                  <td>{title}</td>
                  <td>{content}</td>
                  <td>{createdAt}</td>
                  <td
                    onClick={(e) => {
                      deletePostBtn(postId);
                    }}
                    className="cursor-pointer font-extrabold"
                  >
                    삭제
                  </td>
                  <td
                    onClick={(e) => {
                      editPostBtn(postId);
                    }}
                    className="cursor-pointer font-extrabold"
                  >
                    수정
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={writeNotice} className="bg-white cursor-pointer shadow-md w-20 h-10 rounded-lg mt-6 hover:bg-[#816bff] hover:text-white">
            공지 작성
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminBoard;
