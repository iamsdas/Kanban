import { PlusIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoard, useStages } from '../../utils';
import Loader from '../common/Loader';
import Modal from '../common/Modal';
import OutlineButton from '../common/OutlineButton';
import Layout from '../Layout';
import NewStage from './NewStage';
import NewTask from './NewTask';
import StageCard from './StageCard';

const Board = () => {
  const { id } = useParams();
  const [newStageModalOpen, setNewStageModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const boardQuery = useBoard(parseInt(id!));
  const stagesQuery = useStages(parseInt(id!));

  if (boardQuery.isLoading || stagesQuery.isLoading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  const { title } = boardQuery.data!;
  const stages = stagesQuery.data ?? [];

  return (
    <Layout>
      <div className='flex flex-col lg:flex-row justify-between items-center pb-5'>
        <h1 className='py-2 text-4xl font-semibold text-gray-700 capitalize'>
          {title}
        </h1>
        <div className='flex gap-2'>
          <OutlineButton
            icon={<PlusIcon className='w-4 h-4' />}
            label='New Stage'
            onClickCB={() => {
              setNewStageModalOpen(true);
            }}
          />
          <OutlineButton
            icon={<PlusIcon className='w-4 h-4' />}
            label='New Task'
            onClickCB={() => {
              setNewTaskModalOpen(true);
            }}
          />
        </div>
      </div>
      {stages.length !== 0 ? (
        <div className='flex gap-4 overflow-x-auto pb-8'>
          {stages &&
            stages.map((stage) => <StageCard key={stage.id} stage={stage} />)}
        </div>
      ) : (
        <div className='h-full -mt-16 w-full flex justify-center items-center text-2xl text-neutral-400'>
          Create a new stage to get started
        </div>
      )}
      <Modal
        closeModalCB={() => setNewStageModalOpen(false)}
        open={newStageModalOpen}>
        <NewStage closeModalCB={() => setNewStageModalOpen(false)} />
      </Modal>
      <Modal
        closeModalCB={() => setNewTaskModalOpen(false)}
        open={newTaskModalOpen}>
        <NewTask
          stages={stages}
          closeModalCB={() => setNewTaskModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
};

export default Board;
