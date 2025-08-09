import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  TagIcon,
  SaveIcon,
  XIcon,
} from "lucide-react";
import { categoryAPI } from "../../../utils/api";

const CategoryManager = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    icon: "📝",
    color: "#85C1E9",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryAPI.getCategories();
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryData.name.trim()) return;

    try {
      const response = await categoryAPI.createCategory({
        name: newCategoryData.name.trim(),
        icon: newCategoryData.icon,
        color: newCategoryData.color,
      });

      if (response.success) {
        await fetchCategories();
        setNewCategoryData({
          name: "",
          icon: "📝",
          color: "#85C1E9",
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Update category
  const handleUpdateCategory = async (categoryId, newName) => {
    if (!newName.trim()) return;

    try {
      const response = await categoryAPI.updateCategory(categoryId, {
        name: newName.trim(),
      });

      if (response.success) {
        await fetchCategories();
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await categoryAPI.deleteCategory(categoryId);

      if (response.success) {
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TagIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Categories
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Category
          </button>
        </div>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <form onSubmit={handleCreateCategory} className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newCategoryData.icon}
                onChange={(e) =>
                  setNewCategoryData({
                    ...newCategoryData,
                    icon: e.target.value,
                  })
                }
                placeholder="Icon"
                className="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                value={newCategoryData.name}
                onChange={(e) =>
                  setNewCategoryData({
                    ...newCategoryData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter category name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                autoFocus
              />
              <input
                type="color"
                value={newCategoryData.color}
                onChange={(e) =>
                  setNewCategoryData({
                    ...newCategoryData,
                    color: e.target.value,
                  })
                }
                className="w-12 h-10 rounded-md border-gray-300 cursor-pointer"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <SaveIcon className="h-4 w-4 mr-1" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategoryData({
                    name: "",
                    icon: "📝",
                    color: "#85C1E9",
                  });
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <XIcon className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No categories
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new category.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="px-6 py-4 hover:bg-gray-50">
              {editingCategory === category.id ? (
                <EditCategoryForm
                  category={category}
                  onSave={(newName) =>
                    handleUpdateCategory(category.id, newName)
                  }
                  onCancel={() => setEditingCategory(null)}
                />
              ) : (
                <CategoryItem
                  category={category}
                  isSelected={selectedCategory === category.name}
                  onSelect={() => onCategorySelect?.(category.name)}
                  onEdit={() => setEditingCategory(category.id)}
                  onDelete={() => handleDeleteCategory(category.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Category Item Component
const CategoryItem = ({ category, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onSelect}
        className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
          isSelected
            ? "bg-indigo-100 text-indigo-800 font-medium"
            : "hover:bg-gray-100 text-gray-900"
        }`}
      >
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm"
            style={{ backgroundColor: category.color || "#85C1E9" }}
          >
            {category.icon || "📝"}
          </div>
          <div className="flex-1">
            <div className="font-medium">{category.name}</div>
            {category.transaction_count && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mt-1">
                {category.transaction_count} transactions
              </span>
            )}
          </div>
        </div>
      </button>

      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={onEdit}
          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
          title="Edit category"
        >
          <EditIcon className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          title="Delete category"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Edit Category Form Component
const EditCategoryForm = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        autoFocus
      />
      <button
        type="submit"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        <SaveIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </form>
  );
};

export default CategoryManager;
