import React, { FC } from 'react'
import classNames from 'classnames'

import { ReactSelectOption } from '~/utils/types/formValues'

type Props = {
  projects: Array<{
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
  }>
}

const ProjectChip: FC<Props> = ({ projects }): JSX.Element => {
  return (
    <div className="-ml-2 flex w-full min-w-[100px] flex-wrap">
      {projects.map((option, index) => {
        const projectName = option.project_name.label
        const otherProjects =
          option.project_name.label !== 'Others' && option.project_name.label?.split(',')

        return (
          <div key={index}>
            {typeof otherProjects === 'object' && projectName !== '' ? (
              <div key={index}>
                {otherProjects.map((val, index) => (
                  <span
                    key={index}
                    className={classNames(
                      'inline-flex items-center rounded-md border border-amber-300',
                      'ml-2 select-none bg-amber-50 px-1.5 py-0.5 text-xs text-amber-600'
                    )}
                  >
                    {val}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default ProjectChip
