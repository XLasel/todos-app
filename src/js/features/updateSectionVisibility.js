import { toggleAll, sectionList, footer } from '../entities/dom.js';
import todoRepository from '../entities/todoRepository.js';

function updateSectionVisibility() {
    if (todoRepository.tasks.length === 0) {
        footer.classList.add('hidden');
        sectionList.classList.add('hidden');
        toggleAll.classList.add('hidden');
    }
    if (todoRepository.tasks.length > 0) {
        footer.classList.remove('hidden');
        sectionList.classList.remove('hidden');
        toggleAll.classList.remove('hidden');
    }
}

export default updateSectionVisibility;