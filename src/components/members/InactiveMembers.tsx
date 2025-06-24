import {Mail, Linkedin, User, Calendar, ArrowLeft} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Member} from '@/types/member';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

const InactiveMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        fetch('/members.json')
            .then(res => res.json())
            .then((data: Member[]) => setMembers(data.filter(m => !m.active)));
    }, []);

    const formatPeriodTitle = (memberSince: string) => {
        const [year, semester] = memberSince.split('-');
        return `${year} - Semestre ${semester}`;
    };

    // Group and sort members by period
    const grouped = members.reduce((acc, m) => {
        const period = m.memberSince || 'Sin periodo';
        (acc[period] = acc[period] || []).push(m);
        return acc;
    }, {} as Record<string, Member[]>);

    const sortedPeriods = Object.keys(grouped).sort((a, b) => {
        if (a === 'Sin periodo') return 1;
        if (b === 'Sin periodo') return -1;
        const [yA, sA] = a.split('-').map(Number);
        const [yB, sB] = b.split('-').map(Number);
        return yB - yA || sB - sA;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto py-12 px-4 mt-30 md:mt-32">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                                <ArrowLeft className="w-8 h-8"/>
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Miembros Inactivos
                            </h1>
                            <p className="text-xl text-gray-600 mt-2">
                                Línea de tiempo de miembros que ya no están activos
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div
                            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200"></div>
                        <div className="space-y-16">
                            {sortedPeriods.map(period => (
                                <div key={period} className="relative">
                                    {/* Period Title */}
                                    <div className="relative flex items-center gap-8 mb-8">
                                        <div className="relative z-10 flex-shrink-0">
                                            <div
                                                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
                                                <Calendar className="w-8 h-8 text-white"/>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                                {period === 'Sin periodo' ? 'Sin Periodo Definido' : formatPeriodTitle(period)}
                                            </h2>
                                            <p className="text-gray-600 mt-1">
                                                {grouped[period].length} miembro{grouped[period].length !== 1 ? 's' : ''}
                                                {period !== 'Sin periodo' ? ` ${grouped[period].length !== 1 ? 'ingresaron' : 'ingresó'} en este periodo` : ''}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Members */}
                                    <div className="ml-32 space-y-8">
                                        {grouped[period].map(member => (
                                            <div key={member.id} className="relative flex items-start gap-4">
                                                <div className="flex-1">
                                                    <div
                                                        className="card flex-row p-md transition-all duration-300 hover:scale-[1.025] overflow-hidden"
                                                    >
                                                        {/* Imagen, info y botones en una fila */}
                                                        <div className="flex flex-row items-left gap-6 w-full">
                                                            {/* Imagen */}
                                                            <div className="flex-shrink-0 bg-azul-electrico radius border-azul-electrico border-3 overflow-hidden flex items-center justify-center" style={{width: '120px', height: '120px', borderRadius: 'var(--radius-md)'}}>
                                                                {member.image && !imageError ? (
                                                                    <Image
                                                                        src={member.image}
                                                                        alt={member.name}
                                                                        width={120}
                                                                        height={120}
                                                                        loading="lazy"
                                                                        decoding="async"
                                                                        className="w-full h-full object-cover object-top"
                                                                        draggable={false}
                                                                        onError={() => setImageError(true)}
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center w-full h-full bg-blue-100">
                                                                        <User className="w-8 h-8 text-blue-600"/>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Contenido principal */}
                                                            <div className="flex flex-col justify-center">
                                                                <h3 className="card__title mb-0 text-base">{member.name}</h3>
                                                                <div className="card__subtitle text-xs">{member.career}</div>
                                                                <div className="text-xs text-blue-700 font-semibold mt-1">
                                                                    Ex - {member.rol}
                                                                </div>
                                                                {/* Botones de contacto debajo del rol */}
                                                                <div className="flex gap-2 mt-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="p-0 btn--secondary btn--small"
                                                                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                                                                    >
                                                                        <Mail className="w-3 h-3"/>
                                                                    </Button>
                                                                    {member.linkedin && (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="h-10 w-10 p-0 btn--secondary"
                                                                            onClick={() => window.open(member.linkedin, '_blank')}
                                                                        >
                                                                            <Linkedin className="w-3 h-3"/>
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Skills */}
                                                        <div className="card__content flex flex-wrap gap-1 mt-4 mb-0">
                                                            {member.skills.map((skill, i) => (
                                                                <Badge
                                                                    key={i}
                                                                    variant="secondary"
                                                                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs px-2 py-0.5"
                                                                >
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Espaciador para que la última tarjeta no quede pegada al fondo */}
                        <div className="h-16" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InactiveMembers;