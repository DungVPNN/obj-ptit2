let profile = document.getElementById("adminProfile");
let manager = document.getElementsByClassName("manager");
let managerItem = document.getElementsByClassName("manager-item");

let products = JSON.parse(localStorage.getItem("products")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

profile.innerHTML = `
                        <img style="width: 100px; height: 100px; border-radius:50%" src="../assets/images/admin.jpg" alt="">
                        <div style="color: white; font-size: 24px">Xin chào Admin!</div>
                    `;

function manager1() {
  managerItem[0].style.display = "block";
  managerItem[1].style.display = "none";
  managerItem[2].style.display = "none";
  manager[0].style.background = "rgb(255, 216, 87)";
  manager[1].style.background = "#f84b34";
  manager[2].style.background = "#f84b34";
  let text = `
                <div style="display: flex; justify-content: space-between">
                    <h2 style="color: red">Danh sách sản phẩm:</h2>
                    <button class="Btn" onclick="addProduct()">Thêm sản phẩm</button> 
                    </div>
                <table class="table">
                <thead>
                        <tr>         
                        <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Trữ lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col" colspan="2">Tùy chỉnh</th>
                        </tr>          
                    </thead>
                    <tbody>
                `;
  for (let i = 0; i < products.length; i++) {
    text += `
                    <tr>
                        <th>${i + 1}</th>
                        <td>${products[i].name}</td>
                        <td><img style="width: 100px" src="${
                          products[i].image
                        }"/></td>
                        <td>${products[i].stock}</td>
                        <td>${VND.format(products[i].price)}</td>
                        <td><button class="Btn" onclick="editProduct(${
                          i + 1
                        })">Sửa</button></td>
                        <td><button class="Btn" onclick="deleteProduct(${
                          i + 1
                        })">Xóa</button></td>
                    </tr>
                `;
  }
  text += `  </tbody>
            </table>
            `;
  managerItem[0].innerHTML = text;
}
function manager2() {
  managerItem[1].style.display = "block";
  managerItem[0].style.display = "none";
  managerItem[2].style.display = "none";
  manager[1].style.background = "rgb(255, 216, 87)";
  manager[0].style.background = "#f84b34";
  manager[2].style.background = "#f84b34";
  let text = `
                <div style="display: flex; justify-content: space-between">
                    <h2 style="color: red">Danh sách Users đã đăng kí:</h2>
                </div>
                <table class="table">
                    <thead>
                        <tr>         
                        <th scope="col">STT</th>
                            <th scope="col">ID User</th>
                            <th scope="col">Tên User</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mật khẩu</th>
                            <th scope="col" colspan="3">Trạng thái</th>      
                        </tr>          
                    </thead>
                `;
  for (let i = 0; i < users.length; i++) {
    text += `
                    <tr>
                        <th>${i + 1}</th>
                        <td>${users[i].id}</td>
                        <td>${users[i].name}</td>
                        <td>${users[i].email}</td>
                        <td>${users[i].password}</td>
                        <td>${users[i].status}</td>
                        <td><button class="Btn" onclick="lockAcc(${i})">Khóa/Mở TK</button></td>
                    </tr>
                `;
  }
  text += `  </tbody>
            </table>
            `;
  managerItem[1].innerHTML = text;
}
function manager3() {
  managerItem[2].style.display = "block";
  managerItem[1].style.display = "none";
  managerItem[0].style.display = "none";
  manager[2].style.background = "rgb(255, 216, 87)";
  manager[1].style.background = "#f84b34";
  manager[0].style.background = "#f84b34";
  // let text = `
  //             <table border="1">
  //                 <thead>
  //                     <tr>
  //                         <td>ID</td>
  //                         <td>Tên sản phẩm</td>
  //                         <td>Ảnh</td>
  //                         <td>Số lượng</td>
  //                         <td>Giá</td>
  //                         <td col-span="2">Tùy chỉnh</td>
  //                     </tr>
  //                 </thead>
  //             `
  // text += `  </tbody>
  //         </table>`;
  // managerItem[2].innerHTML = text;
}

function addProduct() {
  let text = `          <div class="addItem">
                            <h2>Nội dung sản phẩm thêm:</h2>
                            <label>Tên sản phẩm: <input type="image" src=""></label>
                            <label>Ảnh: <input type="text"></label>
                            <label>Trữ lượng: <input type="text"></label>
                            <label>Giá: <input type="text"></label>
                            <button>Thêm</button>
                            <i class="bi bi-x-circle-fill" 1></i>
                        </div>`;
  formAdd.innerHTML = text;
}
function editProduct(id) {
  let text = `          <div class="editItem">
                            <h2>Nội dung sản phẩm thêm:</h2>
                            <table>
                                
                            </table>
                            <label>Tên sản phẩm: <input type="image" src=""></label>
                            <label>Ảnh: <input type="text"></label>
                            <label>Trữ lượng: <input type="text"></label>
                            <label>Giá: <input type="text"></label>
                            <button>Thêm</button>
                            <i class="bi bi-x-circle-fill"></i>
                        </div>`;
  formEdit.innerHTML = text;
}
function deleteProduct(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == products[id].id) {
      let checkRemove = confirm("Xóa sản phẩm này?");
      if (checkRemove) {
        products.splice(i - 1, 1);
        localStorage.setItem("products", JSON.stringify(products));
        manager1();
      }
    }
  }
}
function lockAcc(id) {
  for (let i = 0; i < users.length; i++) {
    if (i == id) {
      if (users[i].status) {
        users[i].status = false;
        localStorage.setItem("usersRegister", JSON.stringify(users));
        manager2();
      } else {
        users[i].status = true;
        localStorage.setItem("usersRegister", JSON.stringify(users));
        manager2();
      }
    }
  }
}
