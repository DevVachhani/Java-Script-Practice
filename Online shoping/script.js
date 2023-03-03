async function fetchData() {
  try {
    const response = await axios.get(
      "https://suggest.imimg.com/suggest/suggester.php?tag=defcon&limit=10&type=product&catid=239&mcatid=2296&v=387"
    );
    // console.log(response.data.product);

    const data = response.data.product;
    let text = "";
    const listes = document.querySelector(".lists");

    data.forEach((val, index) => {
      //   console.log(val, index);
      if (index % 2 === 0) {
        text = `<div>
        <p class="prod_num">${index + 1}</p>
        <img src="/images/t-shirt_1.png" alt="Not Visible" />
        <p class="prod_name">${val.label}...</p>
        <button class="cart-btn">Add to Cart</button>
      </div>`;
      } else {
        text = `<div>
        <p class="prod_num">${index + 1}</p>
        <img src="/images/t-shirt_2.png" alt="Not Visible" />
        <p class="prod_name">${val.label}...</p>
        <button class="cart-btn">Add to Cart</button>
      </div>`;
      }
      listes.insertAdjacentHTML("beforeend", text);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchData();

// const additems = document.
