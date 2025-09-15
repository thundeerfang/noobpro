import React, { useState } from 'react';
import { Info, Users, Code, Award, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

const InfoTab = ({ language, translations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const teamMembers = [
    {
      name: 'Harshit Kushwah',
      role: 'Full Stack Developer',
      email: 'harshit@example.com',
      github: 'https://github.com/harshitkushwah08',
      linkedin: 'https://linkedin.com/in/harshitkushwah',
      avatar: '👨‍💻'
    },
    {
      name: 'Team Member 2',
      role: 'Frontend Developer',
      email: 'member2@example.com',
      github: 'https://github.com/member2',
      linkedin: 'https://linkedin.com/in/member2',
      avatar: '👩‍💻'
    },
    {
      name: 'Team Member 3',
      role: 'UI/UX Designer',
      email: 'member3@example.com',
      github: 'https://github.com/member3',
      linkedin: 'https://linkedin.com/in/member3',
      avatar: '🎨'
    }
  ];

  const projectInfo = {
    name: 'Indore Municipal Corporation Dashboard',
    version: '1.0.0',
    hackathon: 'Smart City Hackathon 2024',
    description: language === 'hi' 
      ? 'इंदौर नगर निगम के लिए एक आधुनिक प्रशासनिक डैशबोर्ड जो नागरिकों की शिकायतों का प्रभावी प्रबंधन करता है।'
      : 'A modern administrative dashboard for Indore Municipal Corporation that effectively manages citizen complaints.',
    technologies: ['React', 'MapLibre GL', 'Tailwind CSS', 'Headless UI', 'Lucide Icons'],
    features: language === 'hi' 
      ? ['इंटरैक्टिव मैप व्यू', 'रियल-टाइम शिकायत ट्रैकिंग', 'विभाग प्रबंधन', 'बहुभाषी समर्थन', 'रोल-बेस्ड एक्सेस']
      : ['Interactive Map View', 'Real-time Issue Tracking', 'Department Management', 'Multi-language Support', 'Role-based Access']
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-800">
            {language === 'hi' ? 'प्रोजेक्ट जानकारी' : 'Project Info'}
          </span>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6 bg-gray-50">
          {/* Project Information */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">
                {language === 'hi' ? 'हैकाथॉन प्रोजेक्ट' : 'Hackathon Project'}
              </h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'नाम:' : 'Name:'}
                </span>
                <span className="ml-2 text-gray-600">{projectInfo.name}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'हैकाथॉन:' : 'Hackathon:'}
                </span>
                <span className="ml-2 text-gray-600">{projectInfo.hackathon}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'संस्करण:' : 'Version:'}
                </span>
                <span className="ml-2 text-gray-600">{projectInfo.version}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'विवरण:' : 'Description:'}
                </span>
                <p className="mt-1 text-gray-600">{projectInfo.description}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'तकनीकें:' : 'Technologies:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {projectInfo.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'मुख्य विशेषताएं:' : 'Key Features:'}
              </h4>
              <ul className="space-y-1">
                {projectInfo.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">
                {language === 'hi' ? 'टीम सदस्य' : 'Team Members'}
              </h3>
            </div>
            
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-800 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Code className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">
                {language === 'hi' ? 'प्रोजेक्ट लिंक्स' : 'Project Links'}
              </h3>
            </div>
            
            <div className="space-y-2">
              <a
                href="https://github.com/harshitkushwah08/ivm-np"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <a
                href="#"
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>
                  {language === 'hi' ? 'लाइव डेमो' : 'Live Demo'}
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTab;