import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import CategoriesTable from "./CategoriesTable";

const MainCategories = () => {
  const [editInfo,setEditInfo] = useState(false)
  const [currentCategory,setCurrentCategory] = useState('')
  console.log(currentCategory)
  const handleEditInfo = () => {setEditInfo(true)}
  const handleCurrentCategory = (category) => {setCurrentCategory(category)}
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Thể loại</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            {editInfo ? <UpdateCategory currentCategory= {currentCategory}/>:<CreateCategory />}
            {/* Categories table */}
            <CategoriesTable 
              handleCurrentCategory= {handleCurrentCategory} 
              handleEditInfo= {handleEditInfo}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
