
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const ChildItem = ({ child, onDelete }) => (
  <li className="bg-gray-800 p-5 rounded-xl flex justify-between items-start hover:bg-gray-700 transition">
    <div>
      <p className="text-white text-lg font-semibold">
        {child.name} <span className="text-sm text-gray-400">({child.age} ans)</span>
      </p>
      <p className="text-sm text-gray-300 mt-1">
        Présent : <span className="text-green-400 font-medium">{child.daysPresent.join(", ")}</span>
      </p>
    </div>
    <div className="flex space-x-3 mt-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.90 }}
        onClick={() => onDelete(child.id)}
        className="text-red-500 hover:text-red-700 transition-100"
        aria-label="Supprimer"
      >
        <Trash2 size={20} />
      </motion.button>
    </div>
  </li>
);

export default ChildItem;
