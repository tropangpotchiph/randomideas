import Modal from './components/modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
new IdeaList();
