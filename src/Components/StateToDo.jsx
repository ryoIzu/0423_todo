import { useState } from "react";
import '../Styles/StateTodo.css';

let maxId = 0;

export default function StateToDo() {
  const [title, setTitle] = useState();
  const [todo, setToDo] = useState([]);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setToDo([
      ...todo,
      {
        id: ++maxId,            //id値
        title,                  //ToD本体
        created: new Date(),    //作成日時
        isDone: false           //実行済か？否か
      }
    ]);
  };

  const handleDone = e => {
    setToDo(todo.map(item => {
      if(item.id === Number(e.target.dataset.id)){
        return {
          ...item,
          isDone: true
        };
      }
      else {
        return item;
      }
    }));
  };

  const handleRemove = e => {
    setToDo(todo.filter(item =>
      //item.idとe.target.dataset.idが一致しないものだけ残す
      //一致しているものは消える
      item.id !== Number(e.target.dataset.id)
    ));
  };

  return(
    <div>
      <label>
        やること：
        <input 
          type="text"
          name="title"
          value={title}
          onChange={handleChangeTitle} />
      </label>
      <button type="button" onClick={handleClick}>追加</button>
      <hr />
      <ul>
        {todo.map(item=>(
          <li 
            key={item.id}
            className={item.isDone ? 'done' : ''}
          >
            {item.title}
            <button type="button" onClick={handleDone} data-id={item.id}>
              済
            </button>
            <button type="button" onClick={handleRemove} data-id={item.id}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}