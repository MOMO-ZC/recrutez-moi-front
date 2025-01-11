import type { Project as ProjectType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';

interface ProjectDisplayerProps {
  projects: ProjectType[];
}

const ProjectDisplayer = (props: ProjectDisplayerProps) => {
  const { projects } = props;
  const itemColor = useThemeColor({}, 'ui-items');

  return (
    <ProjectContainer>
      {projects.map((project, index) => {
        return (
          <ProjectItem color={itemColor} key={index}>
            <ThemedText type="defaultSemiBold">{project.title}</ThemedText>
            <ThemedText type="default">{project.description}</ThemedText>
            <ThemedText type="default">{project.date}</ThemedText>
          </ProjectItem>
        );
      })}
    </ProjectContainer>
  );
};

export default ProjectDisplayer;

const ProjectContainer = styled(View)``;

const ProjectItem = styled(View)<{ color: string }>`
  background-color: ${(props) => props.color};
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
`;
