import axios from "axios";

try {
  const data = await axios.get("/api/v1/product");
  console.log(data);
} catch (error) {
  console.log(error)
}

const HomeView = () => {
  return (
    <div>
      Home
    </div>
  )
}

export default HomeView
