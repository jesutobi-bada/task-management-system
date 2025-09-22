// import { todoSchema, TodoFormData } from "../todos.schema"
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Modal } from "@/components/custom/Modal";
// import { useState, useEffect } from "react";
// import { CloseCircle, ArrowDown2, Calendar, Flag, ProfileCircle, Status } from "iconsax-reactjs";
// import { StatusMenu } from "./StatusMenu";

// // Task Modal Component with React Hook Form and Zod
// const CreateTodoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
//   const [statusOpen, setStatusOpen] = useState<boolean>(false);
//   const [priorityOpen, setPriorityOpen] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm<TodoFormData>({
//     resolver: zodResolver(todoSchema),
//     defaultValues: {
//       taskName: '',
//       status: 'To Do',
//       dates: '',
//       assignees: '',
//       priority: '',
//       description: ''
//     }
//   });

//   const watchedStatus = watch('status');
//   const watchedPriority = watch('priority');

//   const statusOptions = ['To Do', 'In Progress', 'Done'];
//   const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

//   const onSubmit = (data: TodoFormData): void => {
//     console.log('Creating task:', data);
//     reset();
//     onClose();
//   };

//   const handleClose = (): void => {
//     reset();
//     onClose();
//   };

//   useEffect(() => {
//     if (open) {
//       reset();
//     }
//   }, [open, reset]);

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <input
//             {...register('taskName')}
//             placeholder="Task Name"
//             className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none flex-1"
//           />
//           <button
//             onClick={handleClose}
//             type="button"
//             className="p-1 hover:bg-gray-100 rounded transition-colors"
//           >
//             <CloseCircle size={24} className="text-gray-400" />
//           </button>
//         </div>
        
//         {errors.taskName && (
//           <p className="text-red-500 text-sm mb-4">{errors.taskName.message}</p>
//         )}

//         <div onSubmit={handleSubmit(onSubmit)}>
//           <div className="space-y-4">
//             {/* Status */}
//             <div className="flex items-center">
//               <Status size={20} className="text-gray-400 mr-3 ml-0.5" />
//               <span className="text-sm text-gray-600 w-20">Status</span>
//               <StatusMenu/>
//             </div>

//             {/* Dates */}
//             <div className="flex items-center">
//               <Calendar size={12} className="text-gray-400 mr-3 ml-0.5" />
//               <span className="text-sm text-gray-600 w-20">Dates</span>
//               <div className="flex-1">
//                 <input
//                   {...register('dates')}
//                   type="date"
//                   className="text-sm text-gray-600 bg-transparent border-none outline-none w-full"
//                 />
//               </div>
//             </div>

//             {/* Assignees */}
//             <div className="flex items-center">
//               <ProfileCircle size={12} className="text-gray-400 mr-3 ml-0.5" />
//               <span className="text-sm text-gray-600 w-20">Assignees</span>
//               <div className="flex-1">
//                 <input
//                   {...register('assignees')}
//                   type="text"
//                   placeholder="Select Assignee"
//                   className="text-sm text-gray-600 bg-transparent border-none outline-none w-full placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Priority */}
//             <div className="flex items-center">
//               <Flag size={12} className="text-gray-400 mr-3 ml-0.5" />
//               <span className="text-sm text-gray-600 w-20">Priority</span>
//               <div className="flex-1 relative">
//                 <button
//                   type="button"
//                   onClick={() => setPriorityOpen(!priorityOpen)}
//                   className="text-sm text-gray-600 bg-transparent border-none outline-none text-left hover:text-gray-800 transition-colors"
//                 >
//                   {watchedPriority || 'Select Priority'}
//                   <ArrowDown2 size={12} className="inline ml-1" />
//                 </button>
//                 {priorityOpen && (
//                   <div className="absolute top-6 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
//                     {priorityOptions.map((option) => (
//                       <button
//                         key={option}
//                         type="button"
//                         onClick={() => {
//                           setValue('priority', option as 'Low' | 'Medium' | 'High' | 'Urgent');
//                           setPriorityOpen(false);
//                         }}
//                         className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
//                       >
//                         {option}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="flex items-start">
//               {/* <FileText size={12} className="text-gray-400 mr-3 ml-0.5 mt-0.5" /> */}
//               <span className="text-sm text-gray-600 w-20">Description</span>
//               <div className="flex-1">
//                 <textarea
//                   {...register('description')}
//                   placeholder="Write something or type"
//                   rows={3}
//                   className="text-sm text-gray-600 bg-transparent border-none outline-none w-full resize-none placeholder-gray-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Create Button */}
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//               type="button"
//               className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white px-8 py-2.5 rounded-md text-sm font-medium transition-colors"
//             >
//               {isSubmitting ? 'Creating...' : 'Create Task'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreateTodoModal;