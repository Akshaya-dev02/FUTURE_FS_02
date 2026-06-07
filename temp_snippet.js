function x(){
        }

        const displayedLeads = leads.filter(lead => {
          const query = searchTerm.trim().toLowerCase();
          const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
          const matchesSearch =
            !query ||
            [lead.name, lead.company, lead.email, lead.phone, lead.notes || '']
              .join(' ')
              .toLowerCase()
              .includes(query);
          return matchesStatus && matchesSearch;
        });

        const counts = {
          New: leads.filter(lead => lead.status === 'New').length,
          Contacted: leads.filter(lead => lead.status === 'Contacted').length,
          Converted: leads.filter(lead => lead.status === 'Converted').length,
        };

        return React.createElement(
          'div',
          { className: 'container' },
          renderTopBar(),
          React.createElement(
            'section',
            { className: 'hero' },
            React.createElement(
              'div',
              null,
              React.createElement('h1', null, `Welcome back, ${user?.name || user?.email}`),
              React.createElement(
                'p',
                null,
                'Manage your leads, update statuses, and keep follow-up notes all in one place.'
              ),
              React.createElement(
                'div',
                { className: 'status-card' },
                ['New', 'Contacted', 'Converted'].map(status =>
                  React.createElement(
                    'div',
                    { key: status, className: 'stat' },
                    React.createElement('h3', null, status),
                    React.createElement('p', null, counts[status])
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'filter-toolbar' },
                React.createElement('input', {
                  className: 'search-field',
                  type: 'search',
                  placeholder: 'Search leads, companies, or notes',
                  value: searchTerm,
                  onChange: e => setSearchTerm(e.target.value),
                }),
                React.createElement(
                  'div',
                  { className: 'status-filters' },
                  STATUS_FILTERS.map(status =>
                    React.createElement(
                      'button',
                      {
                        key: status,
                        type: 'button',
                        className: `filter-button ${filterStatus === status ? 'active' : ''}`,
                        onClick: () => setFilterStatus(status),
                      },
                      status
                    )
                  )
                )
              )
            ),
            React.createElement(
              'section',
              { className: 'lead-grid' },
              displayedLeads.length > 0
                ? displayedLeads.map(lead =>
                    React.createElement(
                      'article',
                      { key: lead._id || lead.id || lead.email + lead.phone, className: 'card' },
                      React.createElement(
                        'div',
                        { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' } },
                        React.createElement('h2', null, lead.name),
                        React.createElement('span', { className: `badge ${lead.status}` }, lead.status)
                      ),
                      React.createElement('p', null, lead.company),
                      React.createElement('p', null, React.createElement('small', null, lead.email)),
                      React.createElement('p', null, React.createElement('small', null, lead.phone)),
                      React.createElement('p', null, lead.notes || 'No follow-up notes yet.'),
                      React.createElement('div', { className: 'form-actions' },
                        React.createElement(
                          'select',
                          {
                            value: lead.status,
                            onChange: e => updateLead(lead._id || lead.id, { status: e.target.value }),
                          },
                          STATUS_OPTIONS.map(opt =>
                            React.createElement('option', { key: opt, value: opt }, opt)
                          )
                        ),
                        React.createElement(
                          'button',
                          {
                            type: 'button',
                            className: 'secondary',
                            onClick: () => {
                              const note = prompt('Update notes for this lead:', lead.notes || '');
                              if (note !== null) {
                                updateLead(lead._id || lead.id, { notes: note });
                              }
                            },
                          },
                          'Update notes'
                        ),
                        React.createElement(
                          'button',
                          {
                            type: 'button',
                            className: 'danger',
                            onClick: () => {
                              if (window.confirm('Delete this lead?')) {
                                deleteLead(lead._id || lead.id);
                              }
                            },
                          },
                          'Delete'
                        )
                      )
                    )
                  )
                : React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement('h2', null, leads.length ? 'No matching leads' : 'No leads yet'),
                    React.createElement(
                      'p',
                      null,
                      leads.length
                        ? 'Adjust your search or filter to find leads.'
                        : 'Start by adding a client lead from the Add Lead tab.'
                    )
                  )
            ),
            React.createElement(
              'footer',
              null,
              'Organize leads, track status, and convert more customers with your CRM dashboard.'
            )
          );
      }

      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
    
}
