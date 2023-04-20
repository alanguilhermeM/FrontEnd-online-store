export async function getCategories() {
  // Implemente aqui
  try {
    const api = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await api.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(inputSearch, categorieSearch) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  try {
    const api = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categorieSearch}&q=${inputSearch}`);
    const query = await api.json();
    return query;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  try {
    const api = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const query = await api.json();
    return query;
  } catch (error) {
    console.log(error);
  }
}
