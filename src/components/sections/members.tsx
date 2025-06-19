import {useState} from 'react';
import MemberCard, {Member} from '../MemberCard';
import MemberModal from '../MemberModal';

const sampleMembers: Member[] = [
    {
        id: '1',
        name: 'Adrián Ruiz',
        title: 'Ing. Sistemas',
        rol: 'Presidente',
        email: 'correodeadrian@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Figma', 'UI/UX Design', 'Prototyping', 'Design Systems', 'User Research'],
        image: '/Members/Active/Adrian Ruiz.png'
    },
    {
        id: '2',
        name: 'David Vargas',
        title: 'Ing. Sistemas y Cientifico de Datos',
        rol: 'Vicepresidente',
        email: 'correodedavid@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Product Strategy', 'Agile', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
        image: '/Members/Active/David Vargas.png'
    },
    {
        id: '3',
        name: 'Sebastián Galindo',
        title: 'Ing. Sistemas',
        rol: 'Secretario',
        email: 'correodesebastian@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
        image: '/Members/Active/Sebastian Galindo.png'
    },
    {
        id: '4',
        name: 'Juan Ramirez',
        title: 'Ing. Sistemas y Cientifico de Datos',
        rol: 'Infrastructure',
        email: 'correodejuan@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
        image: '/Members/Active/Juan Ramirez.png'
    },
    {
        id: '5',
        name: 'Esteban Salazar',
        title: 'Ing. Sistemas y Cientifico de Datos',
        rol: 'Tesorero',
        email: 'correodeesteban@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Digital Marketing', 'Brand Strategy', 'Content Marketing', 'SEO', 'Analytics'],
        image: '/Members/Active/Esteban Salazar.png'
    },
    {
        id: '6',
        name: 'Simón Ortega',
        title: 'Ing. Sistemas',
        rol: 'Dev Ops',
        email: 'correodesimon@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
        image: '/Members/Active/Simon Ortega.png'
    },
    {
        id: '7',
        name: 'Samuel Pico',
        title: 'Ing. Sistemas',
        rol: 'Coord. de Comunicación, Difusión y Diseño',
        email: 'picos@acm.org',
        bio: 'Ingeniero de Sistemas especializado en desarrollo de software y Coordinador de Comunicación y Difusión en ACM Javeriana, combinando experiencia técnica con narrativa creativa para planificar eventos, gestionar redes sociales y ofrecer contenido atractivo.',
        skills: ['Figma', 'Diseño UI/UX', 'Prototipado', 'Sistemas de diseño', 'Investigación de usuarios', 'Estrategia de contenido', 'Gestión de redes sociales', 'Planificación de eventos', 'Liderazgo de equipos', 'Python', 'JavaScript', 'SQL', 'Redes'],
        image: '/Members/Active/Samuel Pico.png'
    },
    {
        id: '8',
        name: 'Miguel Vargas',
        title: 'Ing. Sistemas',
        rol: 'Desarrollador Frontend',
        email: 'correodemiguel@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Responsive Design'],
        image: '/Members/Active/Miguel Vargas.png'
    },
    {
        id: '9',
        name: 'Salomón Ávila',
        title: 'Ing. Sistemas',
        rol: 'Desarrollador Backend',
        email: 'correodesalomon@acm.org',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum risus vel nisl suscipit imperdiet. Nulla ut elementum tortor. Morbi semper massa et placerat maximus. Cras non sapien a risus imperdiet congue. Nullam a erat odio. Quisque congue, nulla sollicitudin auctor pulvinar, diam arcu mollis metus, nec fringilla lacus erat nec sapien.',
        skills: ['Node.js', 'Express', 'Databases', 'API Development', 'Microservices'],
        image: '/Members/Active/Salomon Avila.png'
    },
];

export function Members() {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMemberClick = (member: Member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-4 mb-10">
                <h1>
                    Nuestro Equipo
                </h1>
                <p className="text-xl">
                    Conoce a los talentosos individuos que hacen que nuestro capítulo sea excepcional
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {sampleMembers.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        onClick={handleMemberClick}
                    />
                ))}
            </div>

            <MemberModal
                member={selectedMember}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}