
const SucessResponse = (res, data, message = "Success") => {
  return res.status(200).json({ message, data });
};
const ErrorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

const response = {
  GET_PRODUCTS_SUCCESS: "Products retrieved successfully",
  GET_PRODUCTS_FAILED: "Failed to retrieve products",

  PRODUCT_CREATED_SUCCESS: "Product created successfully",
  PRODUCT_CREATED_FAILED: "Failed to create product",

  PRODUCT_UPDATED_SUCCESS: "Product updated successfully",
  PRODUCT_UPDATED_FAILED: "Failed to update product",

  PRODUCT_DELETED_SUCCESS: "Product deleted successfully",
  PRODUCT_DELETED_FAILED: "Failed to delete product",

  PRODUCT_NOT_FOUND: "Product not found",
  NO_PRODUCTS_FOUND: "No products found",

  NO_UNITS_FOUND: "No units found",
  GET_UNITS_SUCCESS: "Units retrieved successfully",
  UNITS_NOT_FOUND: "Unit not found",
  UNITS_CREATED_SUCCESS: "Unit created successfully",
  UNITS_CREATED_FAILED: "Failed to create unit",
  UNITS_UPDATED_SUCCESS: "Unit updated successfully",
  UNITS_UPDATED_FAILED: "Failed to update unit",
  UNITS_DELETED_SUCCESS: "Unit deleted successfully",
  UNITS_DELETED_FAILED: "Failed to delete unit",
  UNITS_ALREADY_EXISTS: "Unit already exists",
  

  GET_CATEGORIES_SUCCESS: "Categories retrieved successfully",
  CATEGORIES_GET_ERROR: "Failed to retrieve categories",
  CATEGORIES_CREATED_SUCCESS: "Category created successfully",
  CATEGORIES_CREATED_FAILED: "Failed to create category",
  CATEGORIES_UPDATED_SUCCESS: "Category updated successfully",
  CATEGORIES_UPDATED_FAILED: "Failed to update category",
  CATEGORIES_DELETED_SUCCESS: "Category deleted successfully",
  CATEGORIES_DELETED_FAILED: "Failed to delete category",


}

module.exports = { SucessResponse, ErrorResponse, response };