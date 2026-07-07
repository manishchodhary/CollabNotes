import { useNavigate } from 'react-router-dom';

export default function NoteCard({ note, onDelete, isOwner }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      className="bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-xl p-5 cursor-pointer transition group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-lg group-hover:text-violet-400 transition truncate">
          {note.title || 'Untitled Note'}
        </h3>
        {note.isPublic && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full shrink-0 ml-2">
            Public
          </span>
        )}
      </div>

      <p className="text-gray-500 text-sm mb-4">
        {new Date(note.updatedAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        })}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">
          {note.files?.length > 0 && `📎 ${note.files.length} file(s)`}
        </span>
        {isOwner && (
          <button
            onClick={e => { e.stopPropagation(); onDelete(note._id); }}
            className="text-xs text-red-500/60 hover:text-red-400 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}